const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
}
function createFolderElement(folder) {
  const folderElement = document.createElement("div");
  folderElement.textContent = folder.name;
  folderElement.classList.add("folder");

  if (folder.children) {
    folder.children.forEach((child) => {
      const childElement = createFolderElement(child);
      folderElement.appendChild(childElement);
    });
  } else if (folder.type === "file") {
    folderElement.classList.add("file");
  }

  return folderElement;
}


function addChildFolder(parentFolder, folderName) {
  const newFolder = {
    name: folderName,
    type: "folder",
    children: [],
  };
  parentFolder.children.push(newFolder);
}

function addFolder() {
  const folderName = prompt("Enter folder name:");
  if (folderName !== null && folderName.trim() !== "") {
    addChildFolder(folderStructure, folderName.trim());
    const folderTree = document.getElementById("folderTree");
    folderTree.innerHTML = "";
    const treeElement = createFolderElement(folderStructure);
    folderTree.appendChild(treeElement);
  }
}



function deleteFolder() {
  const folderTree = document.getElementById("folderTree");
  const folders = folderTree.getElementsByClassName("folder");
  if (folders.length > 0) {
    const lastFolder = folders[folders.length - 1];
    lastFolder.parentNode.removeChild(lastFolder); // ลบโฟลเดอร์ออกจาก HTML

    // ลบโฟลเดอร์ออกจาก folderStructure
    removeFolderFromStructure(folderStructure, lastFolder.textContent.trim());
  }
}

function removeFolderFromStructure(parentFolder, folderName) {
  parentFolder.children = parentFolder.children.filter(
    (child) => child.name !== folderName
  );
  parentFolder.children.forEach((child) => {
    if (child.type === "folder") {
      removeFolderFromStructure(child, folderName);
    }
  });
}

function addFile(folderElement) {
  const fileName = prompt("Enter file name:");
  if (fileName !== null && fileName.trim() !== "") {
    const fileElement = document.createElement("div");
    fileElement.textContent = fileName.trim();
    fileElement.classList.add("file");
    folderElement.appendChild(fileElement);

    // เพิ่มไฟล์ใหม่ลงในโครงสร้าง folderStructure
    const folderName = folderElement.textContent.trim();
    addFileToStructure(folderStructure, folderName, fileName.trim());
  }
}

function addFileToStructure(parentFolder, folderName, fileName) {
  if (parentFolder.name === folderName) {
    parentFolder.children.push({ name: fileName, type: "file" });
  } else {
    parentFolder.children.forEach((child) => {
      if (child.type === "folder") {
        addFileToStructure(child, folderName, fileName);
      }
    });
  }
}

// ปุ่มสร้างไฟล์ในโฟลเดอร์
function createFileButton(folderElement) {
  const createFileButton = document.createElement("button");
  createFileButton.textContent = "Create File";
  createFileButton.addEventListener("click", function () {
    addFile(folderElement);
  });
  folderElement.appendChild(createFileButton);
}

// เพิ่มปุ่มสร้างไฟล์ในโฟลเดอร์ทั้งสอง
const folderElements = document.getElementsByClassName("folder");
for (let folderElement of folderElements) {
  createFileButton(folderElement);
}



const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);

// เลือกปุ่มและสร้างการจัดการเหตุการณ์สำหรับปุ่ม Add Folder
const addFolderButton = document.getElementById("addFolderButton");
addFolderButton.addEventListener("click", addFolder);

// เลือกปุ่มและสร้างการจัดการเหตุการณ์สำหรับปุ่ม Delete Folder
const deleteFolderButton = document.getElementById("deleteFolderButton");
deleteFolderButton.addEventListener("click", deleteFolder);