import { Response } from '../API/types';
import { User } from '../types/models';


export interface InitialUpdate {
  updatedUser: (val: string) => void
  updatedColor: (val: string) => void
  getColor: () => Promise<Response<User | null>>,
}


// export const UdateUserContecst = createContext<InitialUpdate | null>(null);


// export const UdateUserProvider = ({ children }: { children: ReactElement }) => {
//     const [, setIsInProgress] = useState(false);


// const updatedUser = async (newName: string) => {
//     try {
//       setIsInProgress(true);
//         console.log(newName, 'летит на бэк');
//       return await updateUserName(newName);
//     } catch (error) {
//       return wrapErrors(error);
//     } finally {
//       setIsInProgress(false);
//     }
//   };

//   const updatedColor = async (selectedColor: string) => {
//     try {
//       setIsInProgress(true);
//         console.log( `выбран ${selectedColor} цвет`);
//       return await updateUserColor(selectedColor);
//     } catch (error) {
//       return wrapErrors(error);
//     } finally {
//       setIsInProgress(false);
//     }
//   };

//   const getColor = async (): Promise<Response<UpdateUser | null>> => {
//     try {
//       return await getUserColor();
//     } catch (error) {
//       return wrapErrors(error);
//     }
//   };

//   return <UdateUserContecst.Provider value={{
//     updatedUser,
//     updatedColor,
//     getColor,
//   }}>
//     {children}
//   </UdateUserContecst.Provider>;
// };