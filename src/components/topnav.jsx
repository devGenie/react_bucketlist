import React from 'react';
import Search from './search';

const Topnav = ({searchResults}) => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper z-depth-5">
        <div className="container">
          <div className="row">
            <div className="col s3 hide-on-med-and-down"><a href="#" className="brand-logo">Bucketlist Fairy</a></div>
            <div id="topNave" className="col s12 l6">
              <Search searchResults={searchResults} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);
export default Topnav;
