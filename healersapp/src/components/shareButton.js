import React, { Component } from "react";
class ShareButton extends Component {
render (){ 
return (<div class="fb-share-button"
 data-href="http://localhost:3000/hospitalbill" data-layout="button" data-size="large">
 <a target="_blank"
  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" 
  class="fb-xfbml-parse-ignore">Share</a></div>
)
}
}
export default ShareButton

