import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ErrorPage(props) {
   const history = useHistory();
   return (
      <div>
         <h2>{props.location.state.error['message']}</h2>
         <button onClick={() => history.goBack()}>Go back</button>
      </div>
   );
}
