import { SVGAttributes } from 'react';
import logo from '../../img/logo.jfif'
import '../../css/logo.css'

export default function ApplicationLogoDashboard(props: SVGAttributes<SVGElement>) {
    return (
       <img className='logo-dashboard' src={logo} alt="" />
    );
}
