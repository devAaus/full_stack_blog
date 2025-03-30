import { IKContext, IKUpload } from "imagekitio-react";

const Upload = ({ children, type }) => {
   return (
      <IKContext
         publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
         urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      >
         <IKUpload
            useUniqueFileName
            className="hidden"
            accept={`${type}/*`}
         />
         <div className="cursor-pointer">
            {children}
         </div>
      </IKContext>
   )
}

export default Upload