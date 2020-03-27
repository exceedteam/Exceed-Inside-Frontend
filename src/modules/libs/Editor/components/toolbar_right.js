import * as React from 'react';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

class Toolbars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWidth: true
		};
	}
	static defaultProps = {
		onClick: () => {},
		toolbars: {},
		words: {}
	};

	onClick(type) {
		const width = document.getElementsByClassName('createTheNewPost')[0];
		const { isWidth } = this.state;
		if (type === 'subfield' && isWidth) {
			width.style.width = '900px';
			this.setState({ isWidth: !isWidth });
		} else {
			width.style.width = '600px';
			this.setState({ isWidth: !isWidth });
		}
		this.props.onClick(type);
	}

	render() {
		const { preview, expand, subfield, toolbar, words } = this.props;

		const previewActive = classNames({
			'for-active': preview
		});
		const expandActive = classNames({
			'for-active': expand
		});
		const subfieldActive = classNames({
			'for-active': subfield
		});
		return (
			<ul>
				{toolbar.expand && (
					<li
						className={expandActive}
						onClick={() => this.onClick('expand')}
						title={expandActive ? words.fullscreenOff : words.fullscreenOn}
					>
						{expandActive ? <i className="foricon for-contract" /> : <i className="foricon for-expand" />}
					</li>
				)}
				{toolbar.preview && (
					<li className={previewActive} onClick={() => this.onClick('preview')} title={words.preview}>
						{previewActive ? (
							<Icon name="eye slash" size="mini" className="size12" />
						) : (
							<Icon name="eye" size="mini" className="size12" />
						)}
					</li>
				)}
				{toolbar.subfield && (
					<li
						className={subfieldActive}
						onClick={() => {
							this.onClick('subfield');
						}}
						title={subfieldActive ? words.singleColumn : words.doubleColumn}
					>
						<Icon name="columns" size="mini" className="size12" />
					</li>
				)}
			</ul>
		);
	}
}

export default Toolbars;
