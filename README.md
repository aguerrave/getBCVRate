# API de Tasa de Cambio del BCV

## **Descripción**
Esta API permite consultar la tasa de cambio oficial publicada por el Banco Central de Venezuela (BCV).

## **Endpoints**

### **GET /api/v1/rates/bcv**
Obtiene la tasa de cambio actual del BCV.

#### **Respuesta Exitosa (200):**
```json
{
    "success": true,
    "bcvRate": 46.7537,
    "valueDate": "Wednesday, 27 November 2024"
}
