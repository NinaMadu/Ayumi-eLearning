import React, { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState({});
  const [counter, setCounter] = useState(0);

  const hasFiles = (types = []) => types.indexOf("Files") > -1;

  const addFile = (file) => {
    const isImage = file.type.match("image.*");
    const objectURL = URL.createObjectURL(file);

    const newFile = {
      name: file.name,
      size:
        file.size > 1024
          ? file.size > 1048576
            ? Math.round(file.size / 1048576) + "mb"
            : Math.round(file.size / 1024) + "kb"
          : file.size + "b",
      src: isImage ? objectURL : null,
      type: file.type,
    };

    setFiles((prevFiles) => ({
      ...prevFiles,
      [objectURL]: newFile,
    }));
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    Array.from(ev.dataTransfer.files).forEach((file) => {
      addFile(file);
    });
    setCounter(0);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!hasFiles(e.dataTransfer.types)) return;
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDragLeave = (e) => {
    if (counter > 0) setCounter((prevCounter) => prevCounter - 1);
  };

  const handleDragOver = (e) => {
    if (hasFiles(e.dataTransfer.types)) e.preventDefault();
  };

  const handleDelete = (url) => {
    const newFiles = { ...files };
    delete newFiles[url];
    setFiles(newFiles);
  };

  const handleFileUpload = (e) => {
    Array.from(e.target.files).forEach((file) => addFile(file));
  };

  const handleSubmit = () => {
    alert(`Submitted Files:\n${JSON.stringify(files, null, 2)}`);
  };

  const handleCancel = () => {
    setFiles({});
  };

  return (
    <div className="bg-white h-full w-full p-0"> {/* Adjust to parent size */}
      <main className="container mx-auto w-full h-full p-4">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          <div
            id="overlay"
            className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md ${counter > 0 ? "draggedover" : ""
              }`}
          >
            {/* Overlay content (currently hidden) */}
          </div>

          <section className="h-full overflow-auto p-6 flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 text-center">
                Drag and drop your files anywhere or
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={() => document.getElementById("hidden-input").click()}
              >
                Upload a file
              </button>
            </header>

            <h1 className="pt-8 pb-3 font-semibold text-lg text-gray-900">
              To Upload
            </h1>

            <ul id="gallery" className="flex flex-wrap gap-2">
              {Object.keys(files).length === 0 ? (
                <li
                  id="empty"
                  className="w-full text-center flex flex-col items-center justify-center"
                >
                  <img
                    className="mx-auto w-32"
                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                    alt="no data"
                  />
                  <span className="text-sm text-gray-500">No files selected</span>
                </li>
              ) : (
                Object.keys(files).map((url) => (
                  <li
                    key={url}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-24 p-1"
                  >
                    <article
                      className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline ${files[url].src ? "hasImage" : ""
                        } bg-gray-100 cursor-pointer relative shadow-sm`}
                    >
                      {files[url].src && (
                        <img
                          alt={files[url].name}
                          className="img-preview w-full h-full object-cover rounded-md"
                          src={files[url].src}
                        />
                      )}

                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full absolute top-0 py-2 px-3 bg-white bg-opacity-75">
                        <h1 className="flex-1 group-hover:text-blue-800">
                          {files[url].name}
                        </h1>
                        <div className="flex">
                          <span className="p-1 text-blue-800">
                            <i>
                              <svg
                                className="fill-current w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                              </svg>
                            </i>
                          </span>
                          <p className="p-1 size text-xs text-gray-700">
                            {files[url].size}
                          </p>
                          <button
                            className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
                            onClick={() => handleDelete(url)}
                          >
                            <svg
                              className="pointer-events-none fill-current w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="pointer-events-none"
                                d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                              />
                            </svg>
                          </button>
                        </div>
                      </section>
                    </article>
                  </li>
                ))
              )}
            </ul>
          </section>

          <footer className="flex justify-end p-4">
            <button
              id="submit"
              className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
              onClick={handleSubmit}
            >
              Upload now
            </button>
            <button
              id="cancel"
              className="ml-3 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default FileUpload;
