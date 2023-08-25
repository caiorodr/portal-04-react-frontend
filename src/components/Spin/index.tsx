import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import { ContainerSpin } from './styles';


interface SpinCustomProps extends SpinProps {
   variant?: string;
 }
 

export function SpinCustom( { variant, ...pros }: SpinCustomProps) {

   return (
      <ContainerSpin variant={variant} >
         <Spin {...pros } />
      </ContainerSpin>
   )
}