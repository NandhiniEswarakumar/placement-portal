// Simple API client for the React app
// Configure backend URL via REACT_APP_API_URL or defaults to localhost

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function getToken() {
	return localStorage.getItem('token');
}

function setToken(token) {
	if (token) localStorage.setItem('token', token);
	else localStorage.removeItem('token');
}

async function apiFetch(endpoint, { method = 'GET', body, headers = {} } = {}) {
	const token = getToken();
	const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		throw new Error(data.error || `API error (${res.status})`);
	}
	return data;
}

// Auth
export async function login(email, password) {
	const data = await apiFetch('/auth/login', { method: 'POST', body: { email, password } });
	setToken(data.token);
	return data;
}

export async function signup({ email, password, name, role = 'student' }) {
	const data = await apiFetch('/auth/signup', { method: 'POST', body: { email, password, name, role } });
	setToken(data.token);
	return data;
}

export function logout() {
	setToken(null);
}

// Profile
export function getProfile() {
	return apiFetch('/profile/me');
}

export function updateProfile({ jobTitle, location, bio, linkedin, website }) {
	return apiFetch('/profile/me', { method: 'PUT', body: { jobTitle, location, bio, linkedin, website } });
}

// Skills
export function getSkills() {
	return apiFetch('/skills');
}

export function addSkill({ name, category = 'Technical', proficiency = 50 }) {
	return apiFetch('/skills', { method: 'POST', body: { name, category, proficiency } });
}

export function deleteSkill(id) {
	return apiFetch(`/skills/${id}`, { method: 'DELETE' });
}

export { API_BASE_URL, apiFetch, getToken, setToken };

