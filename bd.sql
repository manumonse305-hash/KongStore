CREATE DATABASE kong_store
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE kong_store;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO roles(nombre)
VALUES
('ADMIN'),
('VENDEDOR');


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,

    rol_id INT NOT NULL,

    nombre VARCHAR(150) NOT NULL,
    apellidoP VARCHAR(150) NOT NULL,
    apellidoM VARCHAR(150) NOT NULL,

    usuario VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(150),

    password_hash VARCHAR(255) NOT NULL,

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(id)
);

CREATE TABLE log_accesos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,

    ip VARCHAR(100),

    browser VARCHAR(255),

    evento ENUM('INGRESO','SALIDA') NOT NULL,

    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_log_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    descripcion VARCHAR(255),

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    categoria_id INT NOT NULL,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT,

    precio_venta DECIMAL(10,2) NOT NULL,

    stock_minimo INT DEFAULT 1,

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);

CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    telefono VARCHAR(50),

    email VARCHAR(100),

    direccion VARCHAR(255),

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,

    proveedor_id INT NOT NULL,

    usuario_id INT NOT NULL,

    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,

    total DECIMAL(12,2) DEFAULT 0,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_compra_proveedor
        FOREIGN KEY (proveedor_id)
        REFERENCES proveedores(id),

    CONSTRAINT fk_compra_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);

CREATE TABLE detalle_compras (
    id INT AUTO_INCREMENT PRIMARY KEY,

    compra_id INT NOT NULL,

    producto_id INT NOT NULL,

    cantidad INT NOT NULL,

    costo_unitario DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_detalle_compra
        FOREIGN KEY (compra_id)
        REFERENCES compras(id),

    CONSTRAINT fk_detalle_compra_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(id)
);



CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,

    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,

    total DECIMAL(12,2) NOT NULL,

    costo_total DECIMAL(12,2) DEFAULT 0,

    ganancia DECIMAL(12,2) DEFAULT 0,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_venta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);
CREATE TABLE detalle_ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    venta_id INT NOT NULL,

    producto_id INT NOT NULL,

    cantidad INT NOT NULL,

    precio_unitario DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_detalle_venta
        FOREIGN KEY (venta_id)
        REFERENCES ventas(id),

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(id)
);


CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    telefono VARCHAR(50),

    email VARCHAR(100),

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE estados_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO estados_servicio(nombre)
VALUES
('RECIBIDO'),
('EN_REPARACION'),
('TERMINADO'),
('ENTREGADO');

CREATE TABLE servicios_tecnicos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    cliente_id INT NOT NULL,

    estado_id INT NOT NULL,

    equipo VARCHAR(150) NOT NULL,

    problema TEXT,

    diagnostico TEXT,

    costo DECIMAL(10,2),

    fecha_ingreso DATETIME DEFAULT CURRENT_TIMESTAMP,

    fecha_entrega DATETIME,

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_servicio_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id),

    CONSTRAINT fk_servicio_estado
        FOREIGN KEY (estado_id)
        REFERENCES estados_servicio(id)
);