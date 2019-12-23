import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { createID } from "../../../../services/helpers";
import request from "../../../../services/api/axios/index";

// Component for creating a new post
export default class Createpost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: true,
      text: `# Intro\nGo ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like cmd-b or ctrl-b.\n## Lists\nUnordered lists can be started using the toolbar or by typing *  , -  , or +  . Ordered lists can be started by typing 1. .\n\n#### Unordered\n* Lists are a piece of cake\n* They even auto continue as you type\n* A double enter will end them\n* Tabs and shift-tabs work too\n\n#### Ordered\n1. Numbered lists...\n2. ...work too!`,
      images: []
    };
  }

  handleChange = value => {
    this.setState({ text: value });
  };

  // saving a post to the DB
  submitPost = () => {
    request
      .createPost({
        post: {
          text: this.state.text,
          images: this.state.images
        }
      })
      .then(res => {
        if (res.error) {
          return console.log("error", res.error);
        }
        const id = res;
        this.props.history.push(`post/${id}`);
      })
      .catch(error => {
        console.log("err", error);
      });
  };

  // render forms for creating and editing a post
  render() {
    const self = this;
    return (
      <form>
        <div className="editor">
          <SimpleMDE
            //TODO refactor this
            className={""}
            value={this.state.text}
            onChange={this.handleChange}
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
                // Change the standard bitton of switching the display of the contents of the post
                {
                  name: "preview",
                  title: "toggle Preview haha",
                  className: "fa fa-eye no-disable",
                  action: function(editor) {
                    const { images } = self.state;
                    let withImage = self.state.text;
                    let withoutImage = self.state.text;
                    images.forEach(image => {
                      const imageBase64 = `![](${image.src})`;
                      const imageId = `<id:${image.id}>`;
                      const fromIdtoImage = new RegExp(imageId);
                      const fromImagetoId = /!\[\]\(.+?\)/;
                      withImage = withImage.replace(fromIdtoImage, imageBase64);
                      withoutImage = withoutImage.replace(
                        fromImagetoId,
                        imageId
                      );
                    });

                    editor.isPreviewActive()
                      ? editor.value(withoutImage)
                      : editor.value(withImage);
                    editor.togglePreview(editor);
                  }
                },
                "side-by-side",
                "fullscreen",
                "guide",
                // Added button to save post
                {
                  name: "publish",
                  className: "fa fa-save no-disable",
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
