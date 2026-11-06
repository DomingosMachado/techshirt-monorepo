import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaBook, FaVideo, FaTrophy } from 'react-icons/fa';
import styles from './qrcodeExperience.module.css';

export function QRCodeExperience() {
  const features = [
    {
      icon: <FaBook />,
      title: "Qualificação profissional",
      description: "Cursos referentes a cada camiseta"
    },
    {
      icon: <FaVideo />,
      title: "Aulas ao vivo",
      description: "Aprenda com especialistas da área"
    },
    {
      icon: <FaTrophy />,
      title: "Certificados",
      description: "Conquiste certificados ao completar os cursos"
    },
  ];

  return (
    <section className={styles.qrSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>QR Code Experience</h2>
          <p className={styles.subtitle}>
            Cada camiseta é uma porta de entrada para o conhecimento
          </p>
        </div>

        {/* Wrapper principal para o layout lado a lado */}
        <div className={styles.contentGrid}>
          
          {/* Coluna 1: Celular */}
          <div className={styles.demoSection}>
            <div className={styles.phoneContainer}>
              <div className={styles.phoneMockup}>
                <div className={styles.phoneScreen}>
                  <div className={styles.scannerArea}>
                    <div className={styles.qrCodeContainer}>
                      <QRCodeSVG
                        value="https://example.com/courses"
                        size={220}
                        bgColor="transparent"
                        fgColor="var(--cor-texto-secundario)"
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <div className={styles.scanLine}></div>
                    <div className={styles.corners}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Informações */}
          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>
              O que você encontra em cada QR Code:
            </h3>
            
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaSection}>
              <p className={styles.ctaText}>
                Vista nossa coleção e amplie seus conhecimentos com cursos exclusivos!
              </p>
              <a href="/loja" className={styles.ctaButton}>
                Explorar Coleção
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
