import { SVGAttributes } from 'react';
import logo from '../../img/logo.jfif'
import '../../css/logo.css'

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
       <img className='logo-login' src={logo} alt="" />
    );
}
