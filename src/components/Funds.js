import React from "react";
import { Link } from "react-router-dom";

export default function Funds() {
    return(
        <>
        <section>
            <h2>Event Driven</h2>
            <h3>Capitalizing on Market Inefficiencies through Event-Driven Expertise</h3>
            <p>Aprovecha las oportunidades creadas por errores de cotización temporal en acciones corporativas</p>
            <Link to="/funds/eventdriven">See Event Driven Fund</Link>
        </section>
        <section>
            <h2>Macro</h2>
            <h3>Navigating Global Markets through Macro Insights</h3>
            <p>Descubre cómo nuestra estrategia macro te permite invertir de manera inteligente, aprovechando análisis económicos y políticos globales </p>
            <Link to="/funds/macro">See Event Driven Fund</Link>
        </section>
        <section>
            <h2>Quantitative</h2>
            <h3>Data-Driven Precision in Investment Decisions</h3>
            <p>Invierte con confianza en nuestra estrategia cuantitativa respaldada por modelos matemáticos avanzados 
                que eliminan las emociones humanas de la ecuación, brindándote precisión y objetividad en cada decisión de inversión.</p>
            <Link to="/funds/quantitative">See Event Driven Fund</Link>
        </section>
        <section>
            <h2>Best Value</h2>
            <h3>Persigue el Máximo Rendimiento con Riesgos Calculados</h3>
            <p>Invierte en nuestra estrategia Best Value y busca un rendimiento excepcional, sin límites anuales, 
                respaldado por nuestro compromiso continuo con la excelencia y la innovación.</p>
            <Link to="/funds/bestvalue">See Event Driven Fund</Link>
        </section>
        
        </>
    )
}