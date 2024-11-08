import React, { useEffect, useState } from "react"
import axios from "axios"


const Doguinho: React.FC = () => {
    const [doguinho, setDoguinho] = useState("");


    useEffect(() => {
        const fetchImage = async () => {
          try {
            const response = await axios.get('https://picsum.photos/id/237/400/600', {
              responseType: 'blob', 
            });
            setDoguinho(URL.createObjectURL(response.data));
          } catch (error) {
            console.error('Erro ao buscar a imagem:', error);
          }
        };
    
        fetchImage();
      }, []);


    return (
        <div>
          {doguinho ? (
            <img src={doguinho} alt="Imagem fetchada de Picsum" width="400" height="600" />
          ) : (
            <p>Carregando imagem...</p>
          )}
        </div>
    );
};

export default Doguinho;