import * as React from 'react'
import classNames from 'classnames'
import marked from './lib/helpers/marked'
import keydownListen from './lib/helpers/keydownListen'
import ToolbarLeft from './components/toolbar_left'
import ToolbarRight from './components/toolbar_right'
import { insertText, replaceImg } from './lib/helpers/function'
import 'highlight.js/styles/tomorrow.css'
import './lib/fonts/iconfont.css'
import './lib/css/index.scss'
import { CONFIG } from './lib'

class MdEditor extends React.Component {
  static defaultProps = {
    lineNum: true,
    onChange: () => {
    },
    onSave: () => {
    },
    addImg: () => {
    },
    fontSize: '14px',
    disabled: false,
    preview: false,
    expand: false,
    subfield: false,
    style: {},
    toolbar: CONFIG.toolbar,
    language: 'en',
    images: []
  };
  
  // private currentTimeout: number
  constructor(props) {
    super(props);
    
    this.$vm = React.createRef();
    this.$scrollEdit = React.createRef();
    this.$scrollPreview = React.createRef();
    this.$blockEdit = React.createRef();
    this.$blockPreview = React.createRef();
    
    
    this.state = {
      preview: props.preview,
      expand: props.expand,
      subfield: props.subfield,
      history: [],
      historyIndex: 0,
      lineIndex: 1,
      value: props.value,
      words: {},
      images: props.images,
    }
  }
  
  componentDidMount() {
    const { value } = this.props;
    keydownListen(this.$vm.current, (type) => {
      this.toolBarLeftClick(type)
    });
    this.reLineNum(value);
    this.initLanguage();
  }
  
  componentDidUpdate(preProps) {
    const { value, preview, expand, subfield } = this.props;
    const { history, historyIndex } = this.state;
    if (preProps.value !== value) {
      this.reLineNum(value)
    }
    if (value !== history[historyIndex]) {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = window.setTimeout(() => {
        this.saveHistory(value)
      }, 500)
    }
    if (subfield !== preProps.subfield && this.state.subfield !== subfield) {
      this.setState({ subfield })
    }
    if (preview !== preProps.preview && this.state.preview !== preview) {
      this.setState({ preview })
    }
    if (expand !== preProps.expand && this.state.expand !== expand) {
      this.setState({ expand })
    }
  }
  
  initLanguage = () => {
    const { language } = this.props;
    const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'en';
    this.setState({
      words: CONFIG.language[lang]
    })
  };
  
  handleChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value)
  };
  
  saveHistory = (value) => {
    let { history, historyIndex } = this.state;
    
    history.splice(historyIndex + 1, history.length);
    if (history.length >= 20) {
      history.shift()
    }
    
    historyIndex = history.length;
    history.push(value);
    this.setState({
      history,
      historyIndex
    })
  };
  
  reLineNum(value) {
    const lineIndex = value ? value.split('\n').length : 1;
    this.setState({
      lineIndex
    })
  }
  
  save = () => {
    this.props.onSave(this.$vm.current.value);
  };
  
  undo = () => {
    let { history, historyIndex } = this.state;
    historyIndex = historyIndex - 1;
    if (historyIndex < 0) return;
    this.props.onChange(history[historyIndex]);
    this.setState({
      historyIndex
    })
  };
  
  redo = () => {
    let { history, historyIndex } = this.state;
    historyIndex = historyIndex + 1;
    if (historyIndex >= history.length) return;
    this.props.onChange(history[historyIndex]);
    this.setState({
      historyIndex
    })
  };
  
  toolBarLeftClick = (type) => {
    const { words } = this.state;
    const insertTextObj = {
      h1: {
        prefix: '# ',
        subfix: '',
        str: words.h1
      },
      h2: {
        prefix: '## ',
        subfix: '',
        str: words.h2
      },
      h3: {
        prefix: '### ',
        subfix: '',
        str: words.h3
      },
      h4: {
        prefix: '#### ',
        subfix: '',
        str: words.h4
      },
      img: {
        prefix: '![alt](',
        subfix: ')',
        str: 'url'
      },
      link: {
        prefix: '[title](',
        subfix: ')',
        str: 'url'
      },
      code: {
        prefix: '```',
        subfix: '\n\n```',
        str: 'language'
      },
      tab: {
        prefix: '  ',
        subfix: '',
        str: ''
      }
    };
    
    if (insertTextObj.hasOwnProperty(type)) {
      if (this.$vm.current) {
        const value = insertText(this.$vm.current, insertTextObj[type]);
        this.props.onChange(value)
      }
    }
    
    const otherLeftClick = {
      undo: this.undo,
      redo: this.redo,
      save: this.save
    };
    if (otherLeftClick.hasOwnProperty(type)) {
      otherLeftClick[type]()
    }
  };
  
  addImg = (file, index) => {
    this.props.addImg(file, index)
  };
  
  $img2Url = (name, url) => {
    const value = insertText(this.$vm.current, {
      prefix: `![](${url})`,
      subfix: '',
      str: ''
    });
    this.props.onChange(value)
  };
  
  toolBarRightClick = (type) => {
    const toolbarRightPreviewClick = () => {
      this.setState({
        preview: !this.state.preview
      })
    };
    const toolbarRightExpandClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    };
    const toolbarRightSubfieldClick = () => {
      const { preview, subfield } = this.state;
      if (preview) {
        if (subfield) {
          this.setState({
            subfield: false,
            preview: false
          })
        } else {
          this.setState({
            subfield: true
          })
        }
      } else {
        if (subfield) {
          this.setState({
            subfield: false
          })
        } else {
          this.setState({
            preview: true,
            subfield: true
          })
        }
      }
    };
    
    const rightClick = {
      preview: toolbarRightPreviewClick,
      expand: toolbarRightExpandClick,
      subfield: toolbarRightSubfieldClick
    };
    if (rightClick.hasOwnProperty(type)) {
      rightClick[type]()
    }
  };
  
  focusText = () => {
    this.$vm.current.focus()
  };
  
  handleScoll = (e) => {
    const radio = this.$blockEdit.current.scrollTop / ( this.$scrollEdit.current.scrollHeight - e.currentTarget.offsetHeight );
    this.$blockPreview.current.scrollTop = ( this.$scrollPreview.current.scrollHeight - this.$blockPreview.current.offsetHeight ) * radio
  };
  
  render() {
    const { preview, expand, subfield, lineIndex, words } = this.state;
    const { value, placeholder, fontSize, disabled, height, style, toolbar } = this.props;
    const { images } = this.state;
    const withImage = replaceImg({ type: "img", text: value, images });
    const withoutImage = replaceImg({ type: "id", text: value, images });
    
    const editorClass = classNames({
      'for-editor-edit': true,
      'for-panel': true,
      'for-active': preview && subfield,
      'for-edit-preview': preview && !subfield
    });
    const previewClass = classNames({
      'for-panel': true,
      'for-editor-preview': true,
      'for-active': preview && subfield
    });
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand
    });
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    });
    
    function lineNum() {
      const list = [];
      for (let i = 0; i < lineIndex; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }
    
    return (
      <div className={fullscreen} style={{ height, ...style }}>
        {Boolean(Object.keys(toolbar).length) && (
          <div className="for-toolbar">
            <ToolbarLeft
              toolbar={toolbar}
              words={words}
              onClick={this.toolBarLeftClick}
              addImg={this.addImg}
              {...this.props}
            />
            <ToolbarRight
              toolbar={toolbar}
              words={words}
              preview={preview}
              expand={expand}
              subfield={subfield}
              onClick={this.toolBarRightClick}
            />
          </div>
        )}
        <div className="for-editor" style={{ fontSize }}>
          <div
            className={editorClass}
            ref={this.$blockEdit}
            onScroll={this.handleScoll}
            onClick={this.focusText}
          >
            <div className="for-editor-block" ref={this.$scrollEdit}>
              {lineNum()}
              <div className="for-editor-content">
                <pre>{withoutImage} </pre>
                <textarea
                  ref={this.$vm}
                  value={withoutImage}
                  disabled={disabled}
                  onChange={this.handleChange}
                  placeholder={placeholder ? placeholder : words.placeholder}
                />
              </div>
            </div>
          </div>
          <div className={previewClass} ref={this.$blockPreview}>
            <div
              ref={this.$scrollPreview}
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: marked(withImage) }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MdEditor
