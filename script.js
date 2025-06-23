window.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notesContainer");
  const searchInput = document.getElementById("searchInput");
  const signInBtn = document.getElementById("signInBtn");
  const userInfo = document.getElementById("userInfo");
  const userEmailDisplay = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  let currentUser = null;
  let allNotes = [];

  // 🔐 Sign in with Google
  signInBtn.addEventListener("click", async () => {
    try {
      const result = await window.signInWithPopup(window.auth, window.provider);
      currentUser = result.user;
      updateAuthUI();
      loadNotes();
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });

  // 🔓 Sign out
  logoutBtn.addEventListener("click", async () => {
    await window.signOut(window.auth);
    currentUser = null;
    updateAuthUI();
    notesContainer.innerHTML = "";
  });

  // 🔄 Auth State Listener
  window.onAuthStateChanged(window.auth, user => {
    currentUser = user;
    updateAuthUI();
    if (user) loadNotes();
  });

  // 🧠 Update UI on login/logout
  function updateAuthUI() {
    if (currentUser) {
      signInBtn.classList.add("hidden");
      userInfo.classList.remove("hidden");
      userEmailDisplay.textContent = currentUser.email;
      noteForm.style.display = "block";
    } else {
      signInBtn.classList.remove("hidden");
      userInfo.classList.add("hidden");
      noteForm.style.display = "none";
    }
  }

  // 📤 Submit Note Form
  noteForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const link = document.getElementById("link").value.trim();
    const progressBar = document.getElementById("progressBar");
    const progressFill = document.getElementById("progressFill");

    if (!title || !description || !link) {
      alert("Please fill in all fields.");
      return;
    }

    const saveBtn = noteForm.querySelector("button");
    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;
    progressBar.classList.remove("hidden");
    progressFill.style.width = "0%";

    let percent = 0;
    const fakeProgress = setInterval(() => {
      percent += Math.floor(Math.random() * 20) + 10;
      if (percent >= 95) {
        clearInterval(fakeProgress);
        percent = 95;
      }
      progressFill.style.width = percent + "%";
    }, 200);

    let docRef;
    try {
      docRef = await window.firestoreAddDoc(
        window.firestoreCollection(window.db, "notes"),
        {
          title,
          description,
          link,
          timestamp: Date.now(),
          userEmail: currentUser.email
        }
      );
    } catch (error) {
      console.error("❌ Firestore Add Error:", error);
      alert("Failed to save note: " + error.message);
      saveBtn.innerText = "Save Note";
      saveBtn.disabled = false;
      return;
    }

    clearInterval(fakeProgress);
    progressFill.style.width = "100%";

    const savedMsg = document.createElement("p");
    savedMsg.innerText = "✅ Note saved successfully!";
    savedMsg.className = "saved-msg fade-in text-green-600 text-sm mt-2 text-center";
    noteForm.appendChild(savedMsg);

    const newNote = {
      id: docRef.id,
      title,
      description,
      link,
      timestamp: Date.now(),
      userEmail: currentUser.email
    };

    allNotes.unshift(newNote);
    displayNotes(allNotes);

    setTimeout(() => {
      progressBar.classList.add("hidden");
      progressFill.style.width = "0%";
      savedMsg.classList.add("fade-out");
      setTimeout(() => savedMsg.remove(), 1000);
    }, 2000);

    noteForm.reset();
    saveBtn.innerText = "Save Note";
    saveBtn.disabled = false;
  });

  // 📥 Load notes from Firestore
  async function loadNotes() {
    const q = window.firestoreQuery(
      window.firestoreCollection(window.db, "notes"),
      window.firestoreWhere("userEmail", "==", currentUser.email),
      window.firestoreOrderBy("timestamp", "desc")
    );

    const snapshot = await window.firestoreGetDocs(q);
    allNotes = [];

    snapshot.forEach(doc => {
      allNotes.push({ id: doc.id, ...doc.data() });
    });

    displayNotes(allNotes);
  }

  // 🖼️ Display notes
  function displayNotes(notes) {
    const query = searchInput.value.toLowerCase();
    notesContainer.innerHTML = "";

    notes
      .filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query)
      )
      .forEach(note => {
        const div = document.createElement("div");
        div.className = "note-card bg-white p-4 rounded-xl shadow transition hover:scale-[1.01] duration-200";
        div.innerHTML = `
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold mb-1">${note.title}</h3>
              <p class="text-gray-700 mb-2">${note.description}</p>
              <a href="${note.link}" target="_blank" class="text-blue-500 underline hover:text-blue-700 transition">📥 Download File</a>
            </div>
            <button data-id="${note.id}" class="delete-btn text-red-500 hover:text-red-700 font-bold text-lg">🗑️</button>
          </div>
        `;
        notesContainer.appendChild(div);
      });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async function () {
        const noteId = this.getAttribute("data-id");
        await deleteNote(noteId);
      });
    });
  }

  // ❌ Delete note
  async function deleteNote(id) {
    const docRef = window.firestoreDoc(window.db, "notes", id);
    await window.firestoreDeleteDoc(docRef);
    allNotes = allNotes.filter(note => note.id !== id);
    displayNotes(allNotes);
  }

  // 🔍 Search
  searchInput.addEventListener("input", () => displayNotes(allNotes));
});
