import * as React from 'react';
import { Icon } from 'semantic-ui-react';

class Toolbars extends React.Component {
	static defaultProps = {
		onClick: () => {},
		toolbar: {},
		words: {}
	};

	constructor(props) {
		super(props);

		this.state = {
			imgHidden: true,
			imgList: []
		};
	}

	onClick(type) {
		this.props.onClick(type);
	}

	imgClick() {
		this.setState({
			imgHidden: !this.state.imgHidden
		});
	}

	imgMouseOver() {
		window.clearTimeout(this.timer);
		this.setState({
			imgHidden: false
		});
	}

	imgMouseOut() {
		this.timer = window.setTimeout(() => {
			this.setState({
				imgHidden: true
			});
		}, 150);
	}

	addImgUrl() {
		this.props.onClick('img');
	}

	addImgFile(e) {
		let { imgList } = this.state;
		const index = imgList.length;
		imgList.push(e.target.files[0]);
		this.setState({
			imgList
		});
		this.props.addImg(e.target.files[0], index);
		e.target.value = '';
	}

	render() {
		const { toolbar, words } = this.props;
		const { imgHidden } = this.state;
		return (
			<ul>
				{toolbar.undo && (
					<li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl+z)`}>
						<Icon name="reply" size="mini" className="size12" />
					</li>
				)}
				{toolbar.redo && (
					<li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl+y)`}>
						<Icon name="share" size="mini" className="size12" />
					</li>
				)}
				{toolbar.h1 && (
					<li onClick={() => this.onClick('h1')} title={words.h1} className="bold">
						H1
					</li>
				)}
				{toolbar.h2 && (
					<li onClick={() => this.onClick('h2')} title={words.h2} className="bold">
						H2
					</li>
				)}
				{toolbar.h3 && (
					<li onClick={() => this.onClick('h3')} title={words.h3} className="bold">
						H3
					</li>
				)}
				{toolbar.h4 && (
					<li onClick={() => this.onClick('h4')} title={words.h4} className="bold">
						H4
					</li>
				)}
				{toolbar.img && (
					<li
						className="for-toolbar-img"
						onMouseOver={() => this.imgMouseOver()}
						onMouseOut={() => this.imgMouseOut()}
					>
						<Icon name="image" size="mini" className="size12" />
						<ul style={imgHidden ? { display: 'none' } : {}}>
							<li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
							<li>
								{words.addImg}
								<input
									type="file"
									accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
									onChange={(e) => this.addImgFile(e)}
								/>
							</li>
						</ul>
					</li>
				)}
				{toolbar.link && (
					<li onClick={() => this.onClick('link')} title={words.link}>
						<Icon name="linkify" size="mini" className="size12" />
					</li>
				)}
				{toolbar.code && (
					<li onClick={() => this.onClick('code')} title={words.code}>
						<Icon name="code" size="mini" className="size12" />
					</li>
				)}
				{toolbar.save && (
					<li onClick={() => this.onClick('save')} title={`${words.save} (ctrl+s)`}>
						<i className="foricon for-save" />
					</li>
				)}
				{toolbar.help && (
					<li title={`Help`} onClick={this.props.onHelpClick}>
						<Icon name="help" size="mini" className="size12" />
					</li>
				)}
			</ul>
		);
	}
}

export default Toolbars;
