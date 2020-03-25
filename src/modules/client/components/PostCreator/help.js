import React from 'react';
import classNames from 'classnames';
import Editor from '../../../libs/Editor';
import { Button, Icon } from 'semantic-ui-react';

class Help extends React.Component {
	static defaultProps = {
    toggleVisibleHelpWindow: () => {},
    isVisible: true 
  }
	constructor(props) {
		super(props);
		this.state = {
			memo: `# H1 \n ## H2 \n ### H3 \n #### H4 \n **bold** \n\n *italic* \n\n 	code \n\n * list \n\n 1. list `,
			code: `# H1 \n\n\n ## H2 \n\n ### H3 \n #### H4 \n **bold** \n *italic* \n\n \`\`\`code\`\`\` \n\n * list \n\n 1. list `,
		};
	}

	render() {
		const { memo, code } = this.state;
		const helpContainerClass = classNames({
			active: this.props.isVisible,
			rightSide: true
		});
		return (
			<div className={helpContainerClass}>
				<div className="header">
					<span>Memo</span>
					<Button className="closeBtn" onClick={this.props.toggleVisibleHelpWindow}>
						<Icon name="close" />
					</Button>
				</div>
				<div className="listOfActions">
					<div className="code">
						<Editor value={code} preview={false} lineNum={false} toolbar={{}} />
					</div>
					<div className="prettier">
						<Editor value={memo} preview={true} toolbar={{}} />
					</div>
				</div>
				<a className="link" href="https://pandao.github.io/editor.md/en.html">
					More examples here
				</a>
			</div>
		);
	}
}

export default Help;
