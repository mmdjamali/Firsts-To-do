var mainApp = document.getElementById("MainApp");
var navigation = document.getElementById("navigation");
var currentApp = localStorage.getItem("current-app") || "todo-app";
//setting current app to last one before closing app
if (currentApp == "note-app") {
    navigation.setAttribute("note-app", "");
    navigation.removeAttribute("todo-app");
}
if (currentApp == "todo-app") {
    navigation.setAttribute("todo-app", "");
    navigation.removeAttribute("note-app");
}
//for giving index of element to done button
var updateId;
var isUpdate = false;
//selecting todo elements
var todoAppSetup = "\n<div class=\"todo-input-div\" id=\"todoInputDiv\">\n<input type=\"text\" placeholder=\"New Task...\" class=\"todo-input\" id=\"todoInput\">\n<button class=\"todo-add\" id=\"todoAdd\">\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 56 56\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect id=\"Rectangle 1\" y=\"22\" width=\"56\" height=\"12\" rx=\"3\" fill=\"white\"/>\n    <path id=\"Rectangle 2\" d=\"M25 56C23.3431 56 22 54.6569 22 53L22 3.00001C22 1.34316 23.3431 1.35899e-05 25 1.35899e-05H31C32.6569 1.35899e-05 34 1.34316 34 3.00001V53C34 54.6569 32.6569 56 31 56H25Z\" fill=\"white\"/>\n</svg>\n</button>\n</div>\n\n<div class=\"todo-app\" id=\"todoApp\">\n\n\n\n</div>\n";
var todoElements = document.getElementsByClassName("todo-elements");
var todoInput = document.getElementById("todoInput");
var todoAdd = document.getElementById("todoAdd");
var todoApp = document.getElementById("todoApp");
var todoIcon = document.getElementById("todoIcon");
// getting Todos everyTime App starts
var allTodos = JSON.parse(localStorage.getItem("all-todos") || "[]");
//selecting note elements
var noteApp = document.getElementById("noteApp");
var noteAdd = document.getElementById("noteAdd");
var noteEditor = document.getElementById("noteEditor");
var noteElementsContainer = document.getElementById("noteElementsContainer");
var noteIcon = document.getElementById("noteIcon");
var allNotes = JSON.parse(localStorage.getItem("all-notes") || "[]");
var isCheck;
var noteAppSetup = "\n<div class=\"note-app\" id=\"noteApp\">\n<div class=\"note-elements-container\" id=\"noteElementsContainer\">                \n\n</div>\n</div>\n<button class=\"note-add\" id=\"noteAdd\">\n    <svg width=\"22\" height=\"22\" viewBox=\"0 0 56 56\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect id=\"Rectangle 1\" y=\"22\" width=\"56\" height=\"12\" rx=\"3\" fill=\"white\"/>\n    <path id=\"Rectangle 2\" d=\"M25 56C23.3431 56 22 54.6569 22 53L22 3.00001C22 1.34316 23.3431 1.35899e-05 25 1.35899e-05H31C32.6569 1.35899e-05 34 1.34316 34 3.00001V53C34 54.6569 32.6569 56 31 56H25Z\" fill=\"white\"/>\n    </svg>\n</button>\n\n<div class=\"note-editor\" id=\"noteEditor\">\n\n<button class=\"note-editor-done\" id=\"noteEditorDone\">\n<svg width=\"40\" height=\"40\" viewBox=\"0 0 99 91\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path id=\"Union\" d=\"M60.2548 55L39 76.2548L53.1421 90.397L98.397 45.1421L84.2548 31L84.1985 31.0564L53.1421 0L39 14.1421L59.8579 35H2C0.895416 35 0 35.8954 0 37V53C0 54.1046 0.895416 55 2 55H60.2548Z\" fill=\"#646464\"/>\n</svg>\n</button>\n<textarea class=\"note-editor-title\" id=\"noteEditorTitle\" placeholder=\"Title...\"></textarea>\n<textarea class=\"note-editor-description\" id=\"noteEditorDescription\" placeholder=\"Start typing...\"></textarea>\n\n</div>";
//todo app functions
if (navigation.hasAttribute("todo-app")) {
    mainApp.innerHTML = todoAppSetup;
    showTodos();
}
if (navigation.hasAttribute("note-app")) {
    mainApp.innerHTML = noteAppSetup;
    showNotes();
    setUpNoteApp();
}
//function for rendering todos
function showTodos() {
    var navigation = document.getElementById("navigation");
    if (navigation.hasAttribute("note-app"))
        return;
    var allTodos = JSON.parse(localStorage.getItem("all-todos") || "[]");
    var preTodos = "";
    allTodos.forEach(function (e, index) {
        return preTodos += "\n        <div class=\"todo-elements\" id=\"".concat(index, "\">\n                <div class=\"todo-elements-container\" id=\"").concat(index, "\" ").concat(e.checked ? "checked" : "", ">\n                    <span class=\"todo-checkbox\" id=\"").concat(index, "\"></span>\n                    <p class=\"todo-paragraph\">").concat(e.task, "</p>\n                </div>\n                <button class=\"todo-delete-btn\" id=\"").concat(index, "\">\n                \n                <svg width=\"18\" height=\"7\" viewBox=\"0 0 30 7\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect id=\"Rectangle 10\" y=\"7\" width=\"7\" height=\"30\" transform=\"rotate(-90 0 7)\" fill=\"white\"/>\n                </svg>\n                \n\n                </button>\n\n            </div>");
    });
    if (navigation.hasAttribute("todo-app")) {
        var todoApp_1 = document.getElementById("todoApp");
        todoApp_1.innerHTML = preTodos || "\n        <div class=\"empty-icon-div\">\n    <svg width=\"70\" height=\"70\" viewBox=\"0 0 52 52\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path id=\"Todo-logo-box\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.12 0C1.39687 0 0 1.39687 0 3.12L1.52588e-05 3.12986V22.88C1.52588e-05 24.6031 1.39689 26 3.12002 26C4.84314 26 6.24002 24.6031 6.24002 22.88V6.24H22.88C24.6031 6.24 26 4.84313 26 3.12C26 1.39687 24.6031 0 22.88 0H3.12002H3.12ZM48.875 52C48.8767 52 48.8783 52 48.88 52C48.9877 52 49.0941 51.9945 49.199 51.9839C50.7723 51.8241 52 50.4954 52 48.88M48.875 52H29.12C27.3969 52 26 50.6031 26 48.88C26 47.1569 27.3969 45.76 29.12 45.76H45.76V29.12C45.76 27.3969 47.1568 26 48.88 26C50.6031 26 52 27.3969 52 29.12V48.869\" fill=\"#949494\"/>\n        <rect id=\"Rectangle 9\" x=\"23.5\" y=\"37.5\" width=\"25\" height=\"6\" transform=\"rotate(-90 23.5 37.5)\" fill=\"#949494\"/>\n        <rect id=\"Rectangle 10\" x=\"14\" y=\"22\" width=\"25\" height=\"6\" fill=\"#949494\"/>\n        </svg>\n        <p>Empty</p>\n    </div>";
    }
    todoEvents();
}
;
//function for adding events to todo elements
function todoEvents() {
    var todoCheckboxes = document.getElementsByClassName("todo-checkbox");
    var todoDeleteButtons = document.getElementsByClassName("todo-delete-btn");
    var todoElements = document.getElementsByClassName("todo-elements");
    var todoElementsContainers = document.getElementsByClassName("todo-elements-container");
    for (var i = 0; i < todoElements.length; i++) {
        var todoElementsContainers = document.getElementsByClassName("todo-elements-container");
        todoCheckboxes[i].onclick = function (e) {
            todoElementsContainers[e.target.id].toggleAttribute("checked");
            allTodos[e.target.id].checked = !allTodos[e.target.id].checked;
            localStorage.setItem("all-todos", JSON.stringify(allTodos));
        };
        todoDeleteButtons[i].onclick = function (e) {
            allTodos.splice(e.target.id, 1);
            localStorage.setItem("all-todos", JSON.stringify(allTodos));
            showTodos();
        };
    }
}
//if in first run current app is todolist this will set the events
if (navigation.hasAttribute("todo-app")) {
    setUpTodoApp();
}
//function for adding new todo to list
function setUpTodoApp() {
    var todoAdd = document.getElementById("todoAdd");
    todoAdd.onclick = function () {
        var todoInput = document.getElementById("todoInput");
        var todoApp = document.getElementById("todoApp");
        if (todoInput.value == "")
            return;
        var value = todoInput.value;
        allTodos.push({ task: value.toString(), checked: false });
        todoInput.value = "";
        localStorage.setItem("all-todos", JSON.stringify(allTodos));
        showTodos();
    };
}
;
todoIcon.onclick = function (e) {
    navigation.setAttribute("todo-app", "");
    navigation.removeAttribute("note-app");
    mainApp.innerHTML = todoAppSetup;
    setUpTodoApp();
    showTodos();
    localStorage.setItem("current-app", "todo-app");
};
//change app to note
noteIcon.onclick = function () {
    if (navigation.hasAttribute("note-app"))
        return;
    navigation.setAttribute("note-app", "");
    navigation.removeAttribute("todo-app");
    mainApp.innerHTML = noteAppSetup;
    var noteEditor = document.getElementById("noteEditor");
    noteEditor.style.right = "-700px";
    setUpNoteApp();
    showNotes();
    localStorage.setItem("current-app", "note-app");
};
//rendering notes
function showNotes() {
    var noteElementsContainer = document.getElementById("noteElementsContainer");
    var allNotes = JSON.parse(localStorage.getItem("all-notes") || "[]");
    var preNotes = "";
    allNotes.forEach(function (note, index) {
        return preNotes += "\n       <div class=\"note-elements\" id=\"".concat(index, "\" >\n\n                    <div class=\"note-body\" id=\"").concat(index, "\">\n                        <span class=\"note-title-span\"vid=\"").concat(index, "\"><p class=\"note-title\" id=\"").concat(index, "\">").concat(note.title, "</p></span>\n                        <span class=\"note-description-span\" id=\"").concat(index, "\"><p class=\"note-description\" id=\"").concat(index, "\">").concat(note.description, "</p></span>\n                        <span class=\"note-date-span\" id=\"").concat(index, "\"><p class=\"note-date\" id=\"").concat(index, "\">").concat(note.date, "</p></span>\n                    </div>\n                \n                    <div class=\"note-buttons\" >\n                        <button class=\"note-delete-btn\" id=\"").concat(index, "\">\n                            <svg width=\"20\" height=\"20\" viewBox=\"0 0 60 75\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M5 17C5 15.8954 5.89543 15 7 15H9C10.1046 15 11 15.8954 11 17V73C11 74.1046 10.1046 75 9 75H7C5.89543 75 5 74.1046 5 73V17Z\" fill=\"#808080\"/>\n                                <path d=\"M7 75C5.89543 75 5 74.1046 5 73V69H55V73C55 74.1046 54.1046 75 53 75H7Z\" fill=\"#808080\"/>\n                                <path d=\"M49 17C49 15.8954 49.8954 15 51 15H53C54.1046 15 55 15.8954 55 17V73C55 74.1046 54.1046 75 53 75H51C49.8954 75 49 74.1046 49 73V17Z\" fill=\"#808080\"/>\n                                <path d=\"M0 7C0 5.89543 0.895431 5 2 5H58C59.1046 5 60 5.89543 60 7V10C60 10.5523 59.5523 11 59 11H0.999999C0.447714 11 0 10.5523 0 10V7Z\" fill=\"#808080\"/>\n                                <path d=\"M22 5C22 2.23858 24.2386 0 27 0H33C35.7614 0 38 2.23858 38 5H22Z\" fill=\"#808080\"/>\n                                <path d=\"M38.2132 29L42.4558 33.2426L21.2426 54.4558L17 50.2132L38.2132 29Z\" fill=\"#808080\"/>\n                                <path d=\"M17 33.2426L21.2426 29L42.4558 50.2132L38.2132 54.4558L17 33.2426Z\" fill=\"#808080\"/>\n                                </svg>                    \n                        </button>\n                \n                        <button class=\"note-edit-btn\" id=\"").concat(index, "\">\n                            <svg width=\"20\" height=\"20\" id=\"").concat(index, "\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path id=\"").concat(index, "\" d=\"M15.1825 0.182732C15.2405 0.124528 15.3095 0.0783496 15.3854 0.0468416C15.4613 0.0153335 15.5427 -0.00088501 15.625 -0.00088501C15.7072 -0.00088501 15.7886 0.0153335 15.8645 0.0468416C15.9404 0.0783496 16.0094 0.124528 16.0675 0.182732L19.8175 3.93273C19.8757 3.99079 19.9218 4.05976 19.9533 4.13569C19.9849 4.21162 20.0011 4.29302 20.0011 4.37523C20.0011 4.45744 19.9849 4.53884 19.9533 4.61477C19.9218 4.69071 19.8757 4.75968 19.8175 4.81773L7.31745 17.3177C7.25747 17.3773 7.18603 17.4241 7.10745 17.4552L0.857452 19.9552C0.743872 20.0007 0.619447 20.0118 0.499602 19.9872C0.379756 19.9627 0.269761 19.9034 0.183253 19.8169C0.0967449 19.7304 0.0375281 19.6204 0.0129437 19.5006C-0.0116406 19.3807 -0.000511193 19.2563 0.0449521 19.1427L2.54495 12.8927C2.57611 12.8142 2.62289 12.7427 2.68245 12.6827L15.1825 0.182732V0.182732ZM14.0087 3.12523L16.875 5.99148L18.4912 4.37523L15.625 1.50898L14.0087 3.12523ZM15.9912 6.87523L13.125 4.00898L4.99995 12.134V12.5002H5.62495C5.79071 12.5002 5.94968 12.5661 6.06689 12.6833C6.1841 12.8005 6.24995 12.9595 6.24995 13.1252V13.7502H6.87495C7.04071 13.7502 7.19968 13.8161 7.31689 13.9333C7.4341 14.0505 7.49995 14.2095 7.49995 14.3752V15.0002H7.8662L15.9912 6.87523V6.87523ZM3.78995 13.344L3.65745 13.4765L1.74745 18.2527L6.5237 16.3427L6.6562 16.2102C6.53698 16.1657 6.43419 16.0858 6.3616 15.9813C6.289 15.8767 6.25005 15.7525 6.24995 15.6252V15.0002H5.62495C5.45919 15.0002 5.30022 14.9344 5.18301 14.8172C5.0658 14.7 4.99995 14.541 4.99995 14.3752V13.7502H4.37495C4.24768 13.7501 4.12346 13.7112 4.01892 13.6386C3.91438 13.566 3.8345 13.4632 3.78995 13.344V13.344Z\" fill=\"#808080\" fill-opacity=\"1\"/>\n                                </svg>\n                        </button>\n                \n                    </div>\n                    \n                </div>\n       ");
    });
    noteElementsContainer.innerHTML = preNotes || "\n        <div class=\"empty-notes-div\">\n        <svg width=\"85\" height=\"100\" viewBox=\"0 0 85 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path id=\"note-logo\" d=\"M0 6C0 2.68629 2.68629 0 6 0H54C57.3137 0 60 2.68629 60 6C60 9.31371 57.3137 12 54 12H12V88H73V29C73 25.6863 75.6863 23 79 23C82.3137 23 85 25.6863 85 29V92C85 92.3407 84.9716 92.6748 84.917 93C84.9716 93.3252 85 93.6593 85 94C85 97.3137 82.3137 100 79 100H6C2.68629 100 0 97.3137 0 94V6Z\" fill=\"white\"/>\n        <rect id=\"Rectangle 1\" x=\"20\" y=\"44\" width=\"44\" height=\"12\" fill=\"white\"/>\n        <rect id=\"Rectangle 2\" x=\"36\" y=\"72\" width=\"44\" height=\"12\" transform=\"rotate(-90 36 72)\" fill=\"white\"/>\n        </svg>\n            <p>Empty</p>\n        </div>    \n    ";
    noteElementsContainer.innerHTML += "<div class=\"note-elements-e\"></div>";
    setUpNoteEvents();
}
;
//open note editor for adding new note
function setUpNoteApp() {
    var allNotes = JSON.parse(localStorage.getItem("all-notes") || "[]");
    var noteAdd = document.getElementById("noteAdd");
    var noteEditor = document.getElementById("noteEditor");
    var noteEditorDescription = document.getElementById("noteEditorDescription");
    var noteEditorTitle = document.getElementById("noteEditorTitle");
    noteAdd.onclick = function () {
        isCheck = false;
        noteEditorDescription.value = "";
        noteEditorTitle.value = "";
        noteEditor.style.right = "0px";
    };
    var noteEditorDone = document.getElementById("noteEditorDone");
    noteEditorDone.onclick = function () {
        var allNotes = JSON.parse(localStorage.getItem("all-notes") || "[]");
        if (isUpdate) {
            allNotes[updateId].description = noteEditorDescription.value;
            allNotes[updateId].title = noteEditorTitle.value;
            localStorage.setItem("all-notes", JSON.stringify(allNotes));
            showNotes();
            noteEditor.style.right = "-700px";
            isUpdate = false;
            return;
        }
        if (isCheck == true) {
            noteEditor.style.right = "-700px";
            return;
        }
        var newDate = new Date();
        var titleValue = noteEditorTitle.value;
        var descriptionValue = noteEditorDescription.value;
        var dateYear = newDate.getFullYear();
        var dateMonth = newDate.getMonth();
        var dateDay = newDate.getDate();
        if (titleValue !== "") {
            if (descriptionValue !== "") {
                allNotes.push({
                    title: titleValue,
                    description: descriptionValue,
                    date: dateYear + "," + dateMonth + "," + dateDay
                });
                localStorage.setItem("all-notes", JSON.stringify(allNotes));
                showNotes();
            }
        }
        noteEditor.style.right = "-700px";
    };
}
;
function setUpNoteEvents() {
    var noteBodys = document.getElementsByClassName("note-body");
    var noteDeleteButtons = document.getElementsByClassName("note-delete-btn");
    var noteEditButtons = document.getElementsByClassName("note-edit-btn");
    var noteEditorDescription = document.getElementById("noteEditorDescription");
    var noteEditorTitle = document.getElementById("noteEditorTitle");
    var allNotes = JSON.parse(localStorage.getItem("all-notes") || "[]");
    var noteEditor = document.getElementById("noteEditor");
    for (var i = 0; i < noteBodys.length; i++) {
        noteBodys[i].onclick = function (e) {
            isCheck = true;
            noteEditorDescription.value = allNotes[e.target.id].description;
            noteEditorTitle.value = allNotes[e.target.id].title;
            noteEditor.style.right = "0px";
        };
        noteEditButtons[i].onclick = function (e) {
            isUpdate = true;
            var id = e.target.id;
            noteEditorDescription.value = allNotes[e.target.id].description;
            noteEditorTitle.value = allNotes[e.target.id].title;
            noteEditor.style.right = "0px";
            var noteEditorDone = document.getElementById("noteEditorDone");
            updateId = e.target.id;
        };
        noteDeleteButtons[i].onclick = function (e) {
            allNotes.splice(e.target.id, 1);
            localStorage.setItem("all-notes", JSON.stringify(allNotes));
            showNotes();
        };
    }
}
