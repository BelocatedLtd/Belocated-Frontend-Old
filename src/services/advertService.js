import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import { getToken } from '../../utils/tokenHandler'

const getAuthHeaders = () => {
	const token = getToken()

	if (token) {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	}
}

// Create Advert
export const createAdvert = async (adFormData) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/adverts/create`,
		adFormData,
		headers,
	)
	// console.log(response.data)
	// return
	return response.data
}

// Get User Adverts
export const getUserAdverts = async () => {
	const headers = getAuthHeaders()
	const response = await axios.get(`${BACKEND_URL}/api/adverts`, headers)
	return response.data
}

// Get All User Adverts
export const getAllUserAdverts = async (page, limit) => {
	const response = await axios.get(
		`${BACKEND_URL}/api/adverts/all?page=${page}&limit=${limit}`,
	)
	return response.data
}

// Get All User Adverts
export const getSingleAdvertById = async (id) => {
	const headers = getAuthHeaders()

	const response = await axios.get(`${BACKEND_URL}/api/adverts/${id}`, headers)
	return response.data
}

// Set Advert to be Free
export const setAdvertFree = async (advertId) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/adverts/setadfree/${advertId}`,
		advertId,
		headers,
	)
	return response.data
}

// Delete Advert
export const deleteAdvert = async (advertId) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.delete(
			`${BACKEND_URL}/api/adverts/delete/${advertId}`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Update Advert
export const updateAdvert = async (advertId, adFormData) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.patch(
			`${BACKEND_URL}/api/adverts/update/${advertId}`,
			adFormData,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
		throw message
	}
}
