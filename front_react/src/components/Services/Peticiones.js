import { getStoredUserId } from '../Utils';

export const fetchData = async () => {
    const userId = getStoredUserId().toString();
    try {
        const response = await fetch('https://localhost:7143/api/usuariocalendarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const allusuariocalendarios = await response.json();
            const usuarioCalendarios = allusuariocalendarios.filter(calendar => calendar.usuarioId.toString() === userId);
            const calendarioIds = usuarioCalendarios.map(calendar => calendar.calendarioId);
            const responseCalendarios = await fetch('https://localhost:7143/api/calendarios');
            const data = await responseCalendarios.json();
            const calendariosDelUsuario = data.filter(calendario => calendarioIds.includes(calendario.id));
            return calendariosDelUsuario;
        }
    } catch (error) {
        throw error; 
    }
};



