import { useState, useEffect } from "react";
import { updateUserData, getUserData } from "../../Services/Api";


export default function ProfileEdit({ setIsEditing }) {
    
  const [userData, setUserData] = useState({
    name: '',
    about: '',
    address: '',
    email: '',
    password: '',
  
  });

  const [error, setError] = useState('');
const [success ,setSuccess]=useState('');

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = await getUserData(); 
        setUserData(userdata); 
        setError(null); 
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        setSuccess(null)
      }
    };

    fetchUserData();
  }, []); 


const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const updatedUser = await updateUserData(userData); 
      if (updatedUser) {
        // console.log('User data updated successfully:', updatedUser);
        setSuccess('User data updated successfully');
      }
      setIsEditing(false); 
      setError(null);
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data'); 
      setSuccess(null);
    }
  };
  

  return (
    <div className="container py-5 mt-5">
      <div className="col-md-10 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4">
            <h4 className="mt-0 mb-3 text-dark">Edit User</h4>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="px-4 py-3">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="name"> Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={userData.first_name}
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              {/* <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  value={userData.last_name}
                  onChange={handleChange}
                />
              </div> */}

              {/* About */}
              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  className="form-control"
                  value={userData.about}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
