"use client";
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import styles from './EstadisticasClave.module.css';

export default function EstadisticasClave() {
    const [stats, setStats] = useState({
    totalLibros: 0,
    totalSocios: 0,
    librosPrestados: 0,
    librosAtrasados: 0,
    });

    useEffect(() => {
    fetch('http://localhost:3001/api/estadisticas', {credentials: 'include'})
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(error => console.error("Error al cargar estadísticas:", error));
    }, []);

    return (
    <div className={styles.statsGrid}>
        <div className={styles.statCard}>
        <Typography className={styles.statNumber}>{stats.totalLibros}</Typography>
        <Typography className={styles.statLabel}>Total de Libros</Typography>
        </div>
        <div className={styles.statCard}>
        <Typography className={styles.statNumber}>{stats.totalSocios}</Typography>
        <Typography className={styles.statLabel}>Total de Socios</Typography>
        </div>
        <div className={styles.statCard}>
        <Typography className={styles.statNumber}>{stats.librosPrestados}</Typography>
        <Typography className={styles.statLabel}>Libros Prestados</Typography>
        </div>
        <div className={styles.statCard}>
        <Typography className={styles.statNumber}>{stats.librosAtrasados}</Typography>
        <Typography className={styles.statLabel}>Libros con Atraso</Typography>
        </div>
    </div>
    );
}