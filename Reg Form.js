// Ensure your backend server is running on port 5000: node server.js
const API_URL = 'http://localhost:5000/api/users'; 

// --- 1. USER REGISTRATION LOGIC (For the Registration HTML Page) ---

const form = document.getElementById('userForm');
const msg = document.getElementById('msg');

// Check if the registration form element exists before adding the listener.
// This prevents errors when this script is loaded on the List page.
if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        msg.textContent = '';
        msg.className = 'message';

        const user = {
            fullName: form.fullName.value.trim(),
            email: form.email.value.trim(),
            // *** CRITICAL FIX: Adding DOB (HTML name="Number") and Gender ***
            DOB: form.Number.value.trim(),      
            Gender: form.Gender.value.trim(),   
            // ***************************************************************
            phone: form.phone.value.trim(),
            address: form.address.value.trim(),
            role: form.role.value.trim()
        };

        // simple front-end validation
        if (!user.fullName || !user.email) {
            msg.textContent = 'Full Name and Email are required.';
            msg.classList.add('error');
            return;
        }

        try {
            const res = await fetch(API_URL, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({})); 
                throw new Error(`Request failed: ${errorData.error || res.statusText}`);
            }

            form.reset();
            msg.textContent = 'User registered successfully.';
            msg.classList.add('success');
        } catch (error) {
            console.error("Registration Error:", error); 
            msg.textContent = 'Something went wrong. Please try again.';
            msg.classList.add('error');
        }
    });
}


// --- 2. USER LIST / CRUD LOGIC (For the User List HTML Page) ---

const userTableBody = document.querySelector('#userTable tbody');
const updatePopup = document.getElementById('updatePopup');
const overlay = document.getElementById('overlay');
const updateForm = document.getElementById('updateForm');

// Function to fetch all users (Read)
async function fetchUsers() {
    // Only run if the user table element exists on the page
    if (!userTableBody) return; 

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Could not fetch users');
        const users = await res.json();
        renderUsers(users);
    } catch (err) {
        alert('Failed to load users: Ensure backend is running on port 5000.');
        console.error("Fetch Error:", err);
    }
}

// Function to display users
function renderUsers(users) {
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.fullName}</td>
          <td>${user.email}</td>
          <td>${user.DOB || ''}</td>     <td>${user.Gender || ''}</td>  <td>${user.phone || ''}</td>
          <td>${user.address || ''}</td>
          <td>${user.role || ''}</td>
          <td>
            <button class="btn-update" onclick='openUpdatePopup(${JSON.stringify(user)})'>Update</button>
            <button class="btn-delete" onclick="deleteUser('${user._id}')">Delete</button>
          </td>
        `;
        userTableBody.appendChild(tr);
    });
}

// Function to open the update popup
window.openUpdatePopup = function(user) { // Must be defined globally for onclick
    updatePopup.style.display = 'block';
    overlay.style.display = 'block';
    document.getElementById('updateId').value = user._id;
    document.getElementById('updateFullName').value = user.fullName;
    document.getElementById('updateEmail').value = user.email;
    document.getElementById('updateDOB').value = user.DOB || '';
    document.getElementById('updateGender').value = user.Gender || '';
    document.getElementById('updatePhone').value = user.phone || '';
    document.getElementById('updateAddress').value = user.address || '';
    document.getElementById('updateRole').value = user.role || '';
}

// Function to close the update popup
window.closePopup = function() { // Must be defined globally for onclick
    updatePopup.style.display = 'none';
    overlay.style.display = 'none';
    document.getElementById('updateForm').reset();
}

// Function to delete a user
window.deleteUser = async function(id) { // Must be defined globally for onclick
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' }); 
        if (!res.ok) throw new Error('Delete failed');
        await fetchUsers(); // Re-load list after deletion
    } catch (error) {
        alert('Error deleting user');
    }
}

// Handle update form submission (Update)
if (updateForm) {
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('updateId').value;
        const updatedUser = {
            fullName: document.getElementById('updateFullName').value.trim(),
            email: document.getElementById('updateEmail').value.trim(),
            DOB: document.getElementById('updateDOB').value.trim(),
            Gender: document.getElementById('updateGender').value.trim(),
            phone: document.getElementById('updatePhone').value.trim(),
            address: document.getElementById('updateAddress').value.trim(),
            role: document.getElementById('updateRole').value.trim()
        };
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });
            if (!res.ok) throw new Error('Update failed');
            closePopup();
            await fetchUsers(); // Re-load list after update
        } catch (error) {
            alert('Failed to update user');
        }
    });
}

// *** CRITICAL STEP: Initial Load ***
// This runs fetchUsers() only on the page where the userTableBody element exists.
if (userTableBody) {
    fetchUsers();
}