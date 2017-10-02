import React from 'react';

const User= ({logout})=>{
    return(
           <div className="col s12" id="dropdown-btn">
                <a id="navbar-drop" className='dropdown-button col s12' data-activates='user-dropdown'>Account</a>
                  <ul id='user-dropdown' className='dropdown-content'>
                    <li data-target="password-modal"><a href="#!">Change password</a></li>
                    <li className="divider"></li>
                    <li onClick={logout}><a href="#!"><i className="material-icons">view_module</i>Sign out</a></li>
                  </ul>
           </div>
        )
}

export default User;