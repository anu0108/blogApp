import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles] = useState("");
  const [redirect,setRedirect] = useState(false);

  async function createNewPost(event) {
    const data = new FormData();
    data.set("title",title)
    data.set("summary",summary)
    data.set("content",content);
    data.set("file",files[0]);
     event.preventDefault();
     const response = await fetch("http://localhost:4000/post",{
        method:"POST",
        body:data,
        credentials:"include",
     });

     if(response.ok){
      setRedirect(true);
     }
  }

  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
    <form action="" onSubmit={createNewPost}>
      <input
        type="titile"
        placeholder={"Title"}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <input type="file"
    //   value = {files}
      onChange={event => setFiles(event.target.files)} />

      {/* <Editor value={content} onChange={setContent}/> */}
      <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} />
      {/* res.json({content}) */} 
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
