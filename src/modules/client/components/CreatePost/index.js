import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { createID } from "../../../../services";
import axios from "axios";
import jwtDecode from "jwt-decode";

const createPostURL = "http://localhost:5000/api/post";

export default class Createpost extends React.Component {
  constructor(props) {
    super(props);

    this.token = localStorage.getItem("token");
    const decoded = jwtDecode(this.token);

    this.state = {
      authorId: decoded.id,
      preview: false,
      editedText: ``,
      text: `# Intro\nGo ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like cmd-b or ctrl-b.\n## Lists\nUnordered lists can be started using the toolbar or by typing *  , -  , or +  . Ordered lists can be started by typing 1. .\n\n#### Unordered\n* Lists are a piece of cake\n* They even auto continue as you type\n* A double enter will end them\n* Tabs and shift-tabs work too\n\n#### Ordered\n1. Numbered lists...\n2. ...work too!`,
      images: []
    };
  }

  handleChange = value => {
    this.setState({ text: value });
  };

  submitPost = () => {
    let token = localStorage.getItem("token");
    axios
      .post(createPostURL, this.state, {
        headers: { authorization: token }
      })
      .then(res => {
        const id = res.data.id
        this.props.history.push(`post/${id}`);
      })
      .catch(err => {
        const errors = err.response.data;
        console.log("errors", errors);
        this.setState({ errors });
      });
  };




  render() {
    const self = this;
    return (
      <form>
        <div className="editor">
          <SimpleMDE
            className={""}
            value={this.state.text}
            options={{
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
                {
                  name: "image",
                  className: "md-upload-img fa fa-picture-o",
                  title: "Insert img",
                  action: function(editor) {
                    console.log("editor", editor);
                    let input = document.createElement("input");
                    input.type = "file";
                    input.onchange = e => {
                      let reader = new FileReader();
                      let file = e.target.files[0];
                      reader.onloadend = () => {
                        const cm = editor.codemirror;
                        let id = createID();

                        cm.replaceSelection(`<id:${id}>`);
                        self.setState({
                          editedText: editor.value()
                        });
                        const img = self.state.images;
                        img.push({
                          id: id,
                          src: reader.result
                        });
                        self.setState({
                          images: img
                        });
                      };

                      reader.readAsDataURL(file);
                    };
                    input.click();
                  }
                },
                "|",
                {
                  name: "preview",
                  title: "toggle Preview haha",
                  className: "fa fa-eye no-disable",
                  action: function(editor) {
                    const { images } = self.state;
                    let res = self.state.editedText;
                    images.forEach(image => {
                      const def = `![](${image.src})`;
                      const regexp = new RegExp(`<id:${image.id}?>`);
                      res = res.replace(regexp, def);
                    });

                    self.state.preview ? editor.value(self.state.editedText) : editor.value(res);

                    self.setState({
                      preview: !self.state.preview
                    });
                    editor.togglePreview(editor);
                  }
                },
                "side-by-side",
                "fullscreen",
                "guide",
                {
                  name: "publish",
                  className: "fa fa-eye no-disable",
                  action: this.submitPost
                }
              ]
            }}
          />
        </div>
      </form>
    );
  }
}
