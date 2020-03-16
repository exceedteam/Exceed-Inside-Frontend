/*
  Page with creating a new post
*/
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { createID } from "../../../../services/helpers";
import styles from "./PostCreator.module.css";
import { connect } from "react-redux";
import { createPost } from "../../../redux/actions/posts/create";
import { replaceImg } from "../../../../services/helpers";

// Component for creating a new post
class PostCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: `# Intro\nGo ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like cmd-b or ctrl-b.\n## Lists\nUnordered lists can be started using the toolbar or by typing *  , -  , or +  . Ordered lists can be started by typing 1. .\n\n#### Unordered\n* Lists are a piece of cake\n* They even auto continue as you type\n* A double enter will end them\n* Tabs and shift-tabs work too\n\n#### Ordered\n1. Numbered lists...\n2. ...work too!`,
      images: [],
      height: 0,
      width: 0,
      fontSize: 25
    };
  }

  // state update
  handleChange = value => {
    const element = document.querySelector(".CodeMirror");

    // text spliting by lines
    let lines = value.split("\n");
    let firstLine = lines[0].trim();

    // force header to be created if the header is missing
    if (firstLine.indexOf("#") === 0 && firstLine.indexOf("# ") !== 0) {
      firstLine = firstLine.replace("#", "# ");
      lines[0] = firstLine;
    } else {
      if (firstLine.indexOf("# ") !== 0) {
        firstLine = "# " + firstLine;
        lines[0] = firstLine;
      }
    }
    this.setState({
      text: lines.join("\n"),
      height: element.scrollHeight,
      width: element.scrollWidth
    });
  };

  // saving a post to the DB
  submitPost = () => {
    const { images, text } = this.state;
    let textWithId = text;
    if (images) {
      textWithId = replaceImg({ type: "id", text, images });
    }
    this.props
      .createPost({
        text: textWithId,
        images: this.state.images
      })
      .then(() => {
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log("err", error);
      });
  };

  // render forms for creating and editing a post
  render() {
    const self = this;
    return (
      <div>
        <button className={styles.button} onClick={this.submitPost}>
          Publish
        </button>
        <div className={styles.container}>
          <div className={styles.submit}></div>
          <SimpleMDE
            className={styles.content}
            value={this.state.text}
            onChange={this.handleChange}
            options={{
              status: false,
              toolbar: [
                "bold",
                "italic",
                "heading",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "|",
                "link",
                // Change the standard button for downloading images. added ability to download buttons from local storage (previously there were only links to images)
                {
                  name: "image",
                  className: "md-upload-img fa fa-picture-o",
                  title: "Insert img",
                  action: function(editor) {
                    let input = document.createElement("input");
                    input.type = "file";
                    input.onchange = e => {
                      let reader = new FileReader();
                      let file = e.target.files[0];
                      reader.onloadend = () => {
                        const cm = editor.codemirror;
                        let id = createID();
                        cm.replaceSelection(`<id:${id}>`);
                        const img = self.state.images;
                        img.push({
                          id: id,
                          src: reader.result
                        });
                        self.setState({
                          text: editor.value(),
                          images: img
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  }
                },
                "|",
                // Change the standard button of switching the display of the contents of the post
                {
                  name: "preview",
                  title: "toggle Preview",
                  className: "fa fa-eye no-disable",
                  action: function(editor) {
                    const { images, text } = self.state;
                    let withImage = replaceImg({ type: "img", text, images });
                    let withoutImage = replaceImg({ type: "id", text, images });

                    const promises = images.map(image => {
                      return new Promise((resolve, reject) => {
                        let img = new Image();
                        img.onload = function() {
                          resolve({ height: this.height, width: this.width });
                        };
                        img.src = image.src;
                      });
                    });

                    editor.isPreviewActive()
                      ? editor.value(withoutImage)
                      : editor.value(withImage);

                    const el = document.querySelector(".CodeMirror");
                    const { width, fontSize } = self.state;
                    if (editor.isPreviewActive()) {
                      el.style.height = "100%";
                    } else {
                      const height = self.state.height;
                      Promise.all(promises).then(values => {
                        const superHeight = values.reduce((total, num) => {
                          if (num.width <= width) {
                            return total + num.height - fontSize;
                          } else if (num.width >= width) {
                            return (
                              total +
                              (num.height = num.height / (num.width / width)) -
                              fontSize
                            );
                          }
                          return total + num.height;
                        }, 0);
                        el.style.height = `${height + superHeight}px`;
                      });
                    }
                    editor.togglePreview(editor);
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreator);
