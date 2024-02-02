import axios from 'axios'

export const startUpdateProfile = (data, history) => {
    return async (dispatch) => {
      try {
        const formData = new FormData()
        for (const key in data) {
          formData.append(key, data[key])
        }
  
        const response = await axios.post('http://localhost:3321/api/doctors/create', formData, {
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
  
        const profileData = response.data
        console.log('profile', profileData)
        alert(profileData.message)
        history.push('/account')
        dispatch(updateProfile(profileData))
      } catch (err) {
        console.log('err', err)
        alert(err.message)
      }
    }
  }  

const updateProfile = (data) => {
    return {type: 'UPDATE_PROFILE', payload: data}
}

export const startFetchDoctorProfile = (id) => {
    return async(dispatch) => {
        try{
            console.log('Fetching doctor profile for id:', id)
            const response = await axios.get(`http://localhost:3321/api/doctors/show/${id}` , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('Doctor profile data:', response.data)
            dispatch(fetchDoctorProfile(response.data))
        } catch(err) {
          console.log('err', err)
            alert(err)
        }
    }
}

const fetchDoctorProfile = (data) => {
    console.log('Action payload:', data)
    return{type: 'FETCH_DOCTOR_PROFILE', payload: data}
}

export const startEditProfile = (updatedDoctorData, avatarFile, doctorId, history) => {
    return async (dispatch) => {
      try {
        console.log(doctorId, 'doctorid')
        const formDataObj = new FormData()
        for (const key in updatedDoctorData) {
          formDataObj.append(key, updatedDoctorData[key])
        }
        console.log('formdataobj', formDataObj)
        
        formDataObj.append('avatar', avatarFile)
  
        const response = await axios.put(
          `http://localhost:3321/api/doctors/${doctorId}`,
          formDataObj,
          {
            headers: {
              'Authorization': localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
          }
        )
  
        const profileData = response.data
        console.log('profile', profileData)
        dispatch(editProfile(profileData))
        window.alert('Profile updated successfully')
        history.push('/account')
      } catch (err) {
        console.log('err', err)
        alert(err.message)
      }
    }
  }
    
const editProfile = (data) => {
    return {type: 'EDIT_PROFILE', payload: data}   
}

export const startFetchDoctors = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get('http://localhost:3321/api/doctors/patient' , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('res', response.data)
            dispatch(fetchDoctors(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const fetchDoctors = (data) => {
    return{type: 'FETCH_DOCTORS', payload: data}
}

export const startRemoveDoctor = (doctorId, history) => {
  return async (dispatch) => {
    try {
      console.log('doctorid', doctorId)
      await axios.delete(`http://localhost:3321/api/doctors/remove/${doctorId}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      console.log('Doctor removed:', doctorId)
      dispatch(removeDoctor(doctorId)) 
      alert('Doctor removed successfully') 
      history.push('/account') 
    } catch (error) {
      console.error('Error removing doctor:', error)
    }
  }
}

const removeDoctor = (doctorId) => {
  return { type: 'REMOVE_DOCTOR_SUCCESS', payload: doctorId }
}
