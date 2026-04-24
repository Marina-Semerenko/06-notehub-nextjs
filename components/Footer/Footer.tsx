import css from './Footer.module.css'

export default function Footer() {
    return (
<footer className = {css.footer} > 
  <div className = {css.content} > 
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved. </p> 
    <p className = {css.wrap}> 
      Developer : MSemerenko </p>
       <p>    
        Contact us:
        <a  href = "mailto:student@notehub.app"> student@notehub.app </a> 
      </p> 
    </div>  
    </footer >
    );
};