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
	try {
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
	} catch (err) {
		console.error(`API call failed for ${endpoint}:`, err);
		throw new Error(`Failed to fetch from ${API_BASE_URL}/api${endpoint}: ${err.message}`);
	}
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

export function updateProfile(body) {
	return apiFetch('/profile/me', { method: 'PUT', body });
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

export function updateSkill(id, { name, category = 'Technical', proficiency = 50 }) {
	return apiFetch(`/skills/${id}`, { method: 'PUT', body: { name, category, proficiency } });
}

// Placement
export function getPlacementStats() {
	return apiFetch('/placement/stats');
}

export function getPlacementDrives() {
	return apiFetch('/placement/drives');
}

// Jobs
export function getJobs(filters = {}) {
	const params = new URLSearchParams(filters);
	return apiFetch(`/jobs?${params.toString()}`);
}

export function getJob(id) {
	return apiFetch(`/jobs/${id}`);
}

export function createJob(body) {
	return apiFetch('/jobs', { method: 'POST', body });
}

export function updateJob(id, body) {
	return apiFetch(`/jobs/${id}`, { method: 'PATCH', body });
}

export function deleteJob(id) {
	return apiFetch(`/jobs/${id}`, { method: 'DELETE' });
}

export function applyForJob(jobId) {
	return apiFetch(`/jobs/${jobId}/apply`, { method: 'POST' });
}

export function getJobApplications(jobId) {
	return apiFetch(`/jobs/${jobId}/applications`);
}

// Testimonials
export function getTestimonials() {
	return apiFetch('/testimonials');
}

export function createTestimonial(body) {
	return apiFetch('/testimonials', { method: 'POST', body });
}

export function updateTestimonial(id, body) {
	return apiFetch(`/testimonials/${id}`, { method: 'PATCH', body });
}

export function deleteTestimonial(id) {
	return apiFetch(`/testimonials/${id}`, { method: 'DELETE' });
}

export { API_BASE_URL, apiFetch, getToken, setToken };

