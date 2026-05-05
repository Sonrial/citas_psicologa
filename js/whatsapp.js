/**
 * Convierte una fecha ISO (base Colombia) a la hora local del paciente.
 */
export function obtenerHoraLocalPaciente(fechaIso, zonaHorariaIana) {
    if (!zonaHorariaIana) return null;
    
    return new Intl.DateTimeFormat('es-CO', {
        timeZone: zonaHorariaIana,
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    }).format(new Date(fechaIso));
}

/**
 * Genera el enlace seguro de wa.me
 */
export function generarEnlaceWhatsApp(indicativo, telefono, mensaje) {
    // Limpiamos cualquier caracter raro del teléfono
    const numeroLimpio = telefono.replace(/\D/g, '');
    const indicativoLimpio = indicativo.replace(/\D/g, '');
    const numeroCompleto = `${indicativoLimpio}${numeroLimpio}`;
    
    // Codificamos el mensaje para que sea válido en una URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    return `https://wa.me/${numeroCompleto}?text=${mensajeCodificado}`;
}

// Ejemplo de uso para el recordatorio de 72h
export function generarMensaje72h(paciente, cita) {
    const horaColombia = new Date(cita.fecha_hora_inicio_iso).toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit' });
    const horaLocal = obtenerHoraLocalPaciente(cita.fecha_hora_inicio_iso, paciente.zona_horaria_iana);
    
    let mensaje = `Hola ${paciente.nombre_completo}, te recordamos tu cita el día ${cita.fecha_cita_colombia} a las ${horaColombia} hora Colombia.`;
    
    if (paciente.zona_horaria_iana !== 'America/Bogota') {
        mensaje += `\nSi estás en ${paciente.pais}, tu hora local registrada es ${horaLocal}.`;
    }
    
    mensaje += `\nPor favor confírmanos si puedes asistir.\nCordialmente, Consultorio Psicológico.`;
    
    return mensaje;
}
