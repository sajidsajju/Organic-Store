import React from 'react';
// import { Link } from 'react-router-dom';


// class Whoops404 extends Component {
//     render(){
//         return(
//             <h1 className="whoops">Whoops, 404 not found</h1>
//         )
//     }
// }

const Whoops404 = ({ location }) => (
    <h1 className="whoops">Whoops, {location.pathname} not found</h1>
)


export default Whoops404;

