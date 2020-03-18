/*
  Page with creating a new post
*/
import React from 'react';
import Editor from '../../../libs/Editor';
import { replaceImg } from '../../../libs/Editor/lib/helpers/function';
import { createID } from '../../../../services/helpers';
import { connect } from 'react-redux';
import { createPost } from '../../../redux/actions/posts/create';
import { Button, Icon } from 'semantic-ui-react';

// Component for creating a new post
class PostCreator extends React.Component {
	constructor(props) {
		super(props);
		this.$vm = React.createRef();
		this.state = {
			value: `# Intro\nGo ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like cmd-b or ctrl-b.\n## Lists\nUnordered lists can be started using the toolbar or by typing *  , -  , or +  . Ordered lists can be started by typing 1. .\n\n#### Unordered\n* Lists are a piece of cake\n* They even auto continue as you type\n* A double enter will end them\n* Tabs and shift-tabs work too\n\n#### Ordered\n1. Numbered lists...\n2. ...work too!`,
			images: []
		};
	}

	// state update
	handleChange1 = (value) => {
		const element = document.querySelector('.CodeMirror');

		let lines = value.split('\n');
		let firstLine = lines[0].trim();

		if (firstLine.indexOf('#') === 0 && firstLine.indexOf('# ') !== 0) {
			firstLine = firstLine.replace('#', '# ');
			lines[0] = firstLine;
		} else {
			if (firstLine.indexOf('# ') !== 0) {
				firstLine = '# ' + firstLine;
				lines[0] = firstLine;
			}
		}
		this.setState({
			text: lines.join('\n'),
			height: element.scrollHeight,
			width: element.scrollWidth
		});
	};

	// saving a post to the DB
	submitPost = () => {
		const { images, value } = this.state;
		let textWithId = value;
		if (images.length > 0) {
			textWithId = replaceImg({ type: 'id', text: value, images });
		}
		this.props
			.createPost({
				text: textWithId,
				images: this.state.images
			})
			.then(() => {
				this.props.history.push(`/`);
			})
			.catch((error) => {
				console.log('err', error);
			});
	};

	handleChange(value) {
		this.setState({ value });
	}

	addImg($file) {
		const { images: img } = this.state;

		let id = createID();
		let reader = new FileReader();
		let file = $file;
		reader.onloadend = () => {
			const uri = reader.result;

			this.$vm.current.$img2Url($file.name, uri);

			img.push({
				id: id,
				src: uri
			});
			this.setState({
				images: img
			});
		};

		reader.readAsDataURL(file);
	}

	render() {
		const { value, images } = this.state;
		return (
			<React.Fragment>
				<Editor
					ref={this.$vm}
					value={value}
					language={'en'}
					preview={false}
					images={images}
					toolbar={{
						h1: true,
						h2: true,
						h3: true,
						h4: true,
						img: true,
						link: true,
						code: true,
						preview: true,
						expand: true,
						/* v0.0.9 */
						undo: true,
						redo: true,
						save: false,
						/* v0.2.3 */
						subfield: true
					}}
					lineNum={false}
					addImg={($file) => this.addImg($file)}
					onChange={(value) => this.handleChange(value)}
				/>
				<Button onClick={this.submitPost} className="publishPost" primary animated>
					<Button.Content visible>Submit</Button.Content>
					<Button.Content hidden>
						<Icon name='checkmark' />
					</Button.Content>
				</Button>
			</React.Fragment>
		);
	}
}

export default connect(null, { createPost })(PostCreator);
