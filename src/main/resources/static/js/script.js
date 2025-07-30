// API base URL
const API_URL = '/api';

// DOM Elements
const userForm = document.getElementById('userForm');
const usersTableBody = document.getElementById('usersTableBody');
const formTitle = document.getElementById('formTitle');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userIdInput = document.getElementById('userId');

// Load users when the page loads
document.addEventListener('DOMContentLoaded', loadUsers);

// Form submission
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        name: nameInput.value,
        email: emailInput.value
    };

    const userId = userIdInput.value;
    
    if (userId) {
        updateUser(userId, user);
    } else {
        createUser(user);
    }
});

// Load all users
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        showError('Error loading users');
        console.error('Error:', error);
    }
}

// Create a new user
async function createUser(user) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            resetForm();
            loadUsers();
            showSuccess('User created successfully');
        } else {
            throw new Error('Failed to create user');
        }
    } catch (error) {
        showError('Error creating user');
        console.error('Error:', error);
    }
}

// Update an existing user
async function updateUser(id, user) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            resetForm();
            loadUsers();
            showSuccess('User updated successfully');
        } else {
            throw new Error('Failed to update user');
        }
    } catch (error) {
        showError('Error updating user');
        console.error('Error:', error);
    }
}

// Delete a user
async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadUsers();
                showSuccess('User deleted successfully');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            showError('Error deleting user');
            console.error('Error:', error);
        }
    }
}

// Edit user
function editUser(id, name, email) {
    formTitle.textContent = 'Edit User';
    userIdInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form
function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    formTitle.textContent = 'Add New User';
}

// Render users in the table
function renderUsers(users) {
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="4" class="text-center">No users found</td></tr>';
        return;
    }

    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-warning" onclick="editUser('${user.id}', '${user.name.replace(/'/g, "\'")}', '${user.email}')">
                    Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Show success message
function showSuccess(message) {
    showToast(message, 'success');
}

// Show error message
function showError(message) {
    showToast(message, 'danger');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || document.createElement('div');
    toastContainer.className = 'toast-container';
    
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
    toast.role = 'alert';
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
        toast.remove();
        if (toastContainer.children.length === 0) {
            toastContainer.remove();
        }
    }, 5000);
}
