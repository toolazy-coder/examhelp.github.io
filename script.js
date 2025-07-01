import { storage, db } from './firebase-init.js';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.handleUpload = async function () {
    const file = document.getElementById('fileInput').files[0];
    const category = document.getElementById('categorySelect').value;
    if (!file) return alert('Choose a file first');

    const storageRef = ref(storage, 'resources/' + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'resources'), {
        name: file.name,
        type: file.type,
        category,
        url,
        timestamp: new Date()
    });

    alert('Uploaded!');
    loadResources(); // refresh
};

async function loadResources() {
    const gallery = document.getElementById('resourceGallery');
    gallery.innerHTML = '<h2>Uploaded Resources</h2>';

    const snapshot = await getDocs(collection(db, 'resources'));
    snapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        const docId = docSnap.id;

        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `<h4>${data.name} (${data.category})</h4>`;

        if (data.type.startsWith('image/')) {
            card.innerHTML += `<img src="${data.url}" style="width:100%">`;
        } else if (data.type === 'application/pdf') {
            card.innerHTML += `<iframe src="${data.url}" width="100%" height="400"></iframe>`;
        } else if (data.name.endsWith('.docx')) {
            fetch(data.url)
                .then(res => res.arrayBuffer())
                .then(buffer => mammoth.convertToHtml({ arrayBuffer: buffer }))
                .then(result => {
                    const div = document.createElement('div');
                    div.innerHTML = result.value;
                    card.appendChild(div);
                });
        } else {
            card.innerHTML += `<a href="${data.url}" target="_blank">Download/View File</a>`;
        }

        // Load and display comments
        const commentBox = document.createElement('div');
        commentBox.className = 'comments';
        commentBox.innerHTML = `
      <textarea placeholder="Add a comment"></textarea>
      <button onclick="submitComment('${docId}', this)">Comment</button>
      <div class="comment-list" id="comments-${docId}"></div>
    `;
        card.appendChild(commentBox);

        gallery.appendChild(card);

        loadComments(docId);
    });
}

window.submitComment = async function (docId, button) {
    const textarea = button.previousElementSibling;
    const comment = textarea.value.trim();
    if (!comment) return;

    await addDoc(collection(db, 'comments'), {
        fileId: docId,
        text: comment,
        timestamp: new Date()
    });

    textarea.value = '';
    loadComments(docId);
};

async function loadComments(fileId) {
    const q = query(collection(db, 'comments'), where('fileId', '==', fileId));
    const snapshot = await getDocs(q);
    const commentDiv = document.getElementById('comments-' + fileId);
    commentDiv.innerHTML = '<strong>Comments:</strong><br>';

    snapshot.forEach(doc => {
        const data = doc.data();
        commentDiv.innerHTML += `<div style="border-bottom:1px solid #ccc;margin-bottom:4px;">🗨️ ${data.text}</div>`;
    });
}

window.onload = loadResources;
