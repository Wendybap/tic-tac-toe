//  Guardar partida
export const saveGameToStorage = ({board, turn}) =>{
    
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn)
    
};

// Aquí también reseteamos lo que hay en localStorage
export const resetGameStorage = () => {

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

};