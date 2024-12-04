USE produtos;
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100),
    quantidade INT,
    valor DECIMAL(10, 2)
);
