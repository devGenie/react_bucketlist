import React from 'react';

const User= username=>{
    return(
           <div className="col s12" id="dropdown-btn">
                <a id="navbar-drop" className='dropdown-button col s12' data-activates='user-dropdown'>Onen Julius</a>
                  <ul id='user-dropdown' className='dropdown-content'>
                    <li><a href="#!">Change password</a></li>
                    <li className="divider"></li>
                    <li><a href="#!"><i className="material-icons">view_module</i>Sign out</a></li>
                  </ul>
           </div>
        )
}

export default User;