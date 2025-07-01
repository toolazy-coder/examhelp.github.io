import { storage, db } from './firebase-init.js';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';
import {
    collection,
    addDoc,
    getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

window.handleUpload = async function () {
    const files = document.getElementById('fileInput').files;
    const category = document.getElementById('categorySelect').value;
    const gallery = document.getElementById('resourceGallery');

    for (let file of files) {
        const storageRef = ref(storage, 'resources/' + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'resources'), {
            name: file.name,
            category,
            url: downloadURL,
            type: file.type,
            timestamp: new Date()
        });
        alert(`Uploaded: ${file.name}`);
        loadResources(); // refresh after upload
    }
};

async function loadResources() {
    const gallery = document.getElementById('resourceGallery');
    gallery.innerHTML = '<h2 style="text-align:center;">Uploaded Resources</h2>';

    const snapshot = await getDocs(collection(db, 'resources'));
    snapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `<h4>${data.name} (${data.category})</h4>`;

        if (data.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = data.url;
            card.appendChild(img);
        } else if (data.type === 'application/pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.width = '100%';
            iframe.height = '500';
            card.appendChild(iframe);
        } else if (data.name.endsWith('.docx')) {
            fetch(data.url)
                .then(res => res.arrayBuffer())
                .then(buffer => mammoth.convertToHtml({ arrayBuffer: buffer }))
                .then(result => {
                    const div = document.createElement('div');
                    div.innerHTML = result.value;
                    card.appendChild(div);
                });
        } else if (data.type.startsWith('text/')) {
            fetch(data.url)
                .then(res => res.text())
                .then(text => {
                    const pre = document.createElement('pre');
                    pre.textContent = text;
                    card.appendChild(pre);
                });
        }

        gallery.appendChild(card);
    });
}

window.onload = loadResources;
