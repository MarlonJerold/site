---
title: "Implantação de WordPress Escalável na AWS com Docker, RDS e EFS"
description: "Implantação de uma aplicação WordPress escalável na AWS utilizando Docker, RDS (MySQL), EFS e Load Balancer, garantindo alta disponibilidade, persistência de dados e segurança."
date: "2025-02-07"
---

# Introdução

Este projeto tem como objetivo demonstrar a implementação de uma aplicação WordPress de forma escalável e segura, utilizando os principais serviços da AWS. A solução combina o uso de containers Docker para a aplicação, um banco de dados gerenciado RDS (MySQL) para armazenamento de dados, e o EFS (Elastic File System) para persistência e compartilhamento de arquivos estáticos.

Para garantir alta disponibilidade e balanceamento de carga, a arquitetura inclui um Load Balancer configurado para gerenciar o tráfego de entrada. Além disso, o projeto adota boas práticas de segurança, como evitar a exposição direta da aplicação via IP público e centralizar o tráfego através do Load Balancer.

Com uma abordagem automatizada, a infraestrutura pode ser configurada por meio de scripts de inicialização (user_data.sh) e gerenciada facilmente com Docker Compose, garantindo flexibilidade e facilidade de manutenção.

## Arquitetura

![image](https://github.com/user-attachments/assets/cbfe150d-eb03-4d23-8dda-58937418fd1b)


### Principais Objetivos
- Instalação e Configuração:
  - Instalar e configurar Docker na instância EC2
  - Realizar instalação automatizada utilizar arquivo user_data.sh
- Deploy da Aplicação WordPress
  - Implementar o container da aplicação utilizando Docker Compose
  - Configurar um banco de dados RDS MySQL para armazenar os dados do WordPress
- Configuração de Armazenamento e Balanceamento de Carga
  - Utilizar EFS (Elastic File System) para armazenar arquivos estáticos do WordPress.
  - Configurar um Load Balancer (Classic Load Balancer da AWS) para distribuir o tráfego de entrada.

### Serviços AWS utilizados no Projeto
- VPC
- RDS (Banco de Dados MySQL)
- EFS
- Instâncias EC2
- Load Balancer
- Auto Scaling

### Ferramentas
- AWS
- Shell Script
- Linux
- Docker

## Início

O primeiro passo do nosso projeto, é a criação de uma VPC.

- Bloco CIDR IPv4: 10.0.0.0/16
- Número de Zonas de Disponibilidade (AZs): 2
- Sub-redes: 2 públicas e 2 privadas
- Gateway NAT: 1 por AZ

## Grupo de Segurança
Para o projeto, será necessário criar Grupos de segurança onde será definido regras de entrada e saida.

- sgGroup-loadbalancer
  - HTTP / HTTPS => IPV4
- sgGroup-ec2
  - HTTP / HTTPS => Load Balancer
  - SSH => Qualquer IP
- sgGroup-rds
  - MySQL/Aurora => sgGroup-ec2
- sgGroup-efs
  - NFS => sgGroup-ec2

## RDS
O Amazon RDS (Relational Database Service) facilita a configuração, manutenção e escalabilidade de bancos de dados relacionais. Para aumentar a segurança, é essencial utilizar grupos de sub-redes em sub-redes privadas, impedindo o acesso direto à internet e restringindo conexões apenas a instâncias autorizadas. Por esse motivo, o primeiro passo será a criação do grupo de sub-redes privadas.

### Grupo de Sub-redes Privadas
- Vá em serviço RDS e acesse a aba "Grupos de sub-redes"
- Clicar em Criar Grupo de sub-redes
- Informações
  - Nome do Grupo: ___________
  - Descrição: _____________
  - VPC: Selecione a VPC que você criou
- Selecionar as zonas de disponibilidas, em seguida, selecionar sub-redes privadas
- Criar Grupo

### Configurações RDS
- Tipo de banco de dados: MySQL (Nível gratuito).
- Preencher Identificador da instância
- Preencher nome do usuário Principal
- Senha
- Selecionar instância: db.t3.micro
- Desative Backup e Cripografia para testes
- Selecionar VPC Criada
- Selecionar Grupo de sub-redes já criado
- Não permitir acesso público
- Adicionar Grupo de Segurança: sgGroup-rds
- Nome do Banco de dados inicial: wordpress
- Desmarcar escalabilidade automática de armazenamento

Ao criar o RDS, será gerado um IP, salve o IP para acessar o banco para adicionar no nosso arquivo user_data.sh

### EFS

- Nome: meuEFS
- Selecionar VPC criada
- Zonas de disponibilidade: selecionar sub-redes privadas 1 e 2
- Selecionar grupo de segurança: sgGroup-efs

1. Após a criação, você vai acessar o comando de Anexar e "Usando o cliente do NFS"
2. Você vai ter que copiar e salvar o comando de montagem do sistema de arquivo Amazon EFS, localizado no arquivo user_data.sh

Como estamos utilizando Ubuntu, precisamos instalar o Rust para criar o processo de build do nosso EFS e permitir sua montagem em nossa instância.

### Instalação do EFS Utils
```shell
sudo apt-get update
sudo apt-get -y install git binutils rustc cargo pkg-config libssl-dev
git clone https://github.com/aws/efs-utils
cd efs-utils
./build-deb.sh
sudo apt-get -y install ./build/amazon-efs-utils*deb
```

### Montagem do Sistema de Arquivos
Após instalar o EFS Utils, podemos criar e montar nosso sistema de arquivos. Ele será utilizado para compartilhar arquivos entre instâncias.

```shell
sudo mkdir -p /mnt/efs
sudo mount -t efs -o tls fs-12345678:/ /mnt/efs
```

Agora, ao criar um arquivo nesse diretório e acessá-lo a partir de outra instância conectada ao mesmo sistema de arquivos, o arquivo estará disponível em ambas.

### EC2

- Nome e tags: Seguir o padrão da equipe.
- Sistema operacional: Ubuntu.
- Tipo de instância: Padrão.
- Par de chaves: Criar ou reutilizar um existente.
- Sub-redes:
  - Instância 1: Sub-rede privada 1.
  - Instância 2: Sub-rede privada 2.
  - Atribuir IP público automaticamente: Habilitado.
- Grupo de segurança: sgGroup-ec2

Em Configurações avançadas, adicione o user_data.sh.

### Load Balancer
- Tipo: Classic Load Balancer.
- Nome: MyLoadBalancer.
- Mapeamento de rede: Sub-redes públicas.
- Grupo de segurança: sgGroup-loadbalancer
- Caminho de ping: /wp-admin/install.php (espera-se retorno com status 200).
- Selecionar as duas instâncias que criamos privadas que criamos no tópico de EC2

### Auto Scaling
Modelo de Execução (Template):
- Tipo de instância: t2.micro
- Tags e User Data: Mesmos das instâncias EC2 anteriores
- Zonas de disponibilidade: Sub-redes privadas
- Integração: Load Balancer existente
- Demais configurações: Padrão

Após configurar o Auto Scaling, uma nova instância será criada automaticamente, confirmando que o processo foi concluído com sucesso

### Validação de Sistem de Arquivos

Foi criado um Bastion Host, um servidor que permite o acesso seguro a uma rede privada a partir da internet pública. Para isso, criaremos uma instância pública, nos conectaremos a ela via SSH e, estando dentro da nossa VPC, acessaremos outras instâncias privadas. Em uma dessas instâncias, criaremos um arquivo dentro da pasta EFS, chamado ```helloworld.txt```.

### Instância 1 - EC2
Criamos o arquivo na instância 1
![image](https://github.com/user-attachments/assets/dedd7fbf-a6f9-4537-b2f0-31319dbe7b9f)

### Instância 2 - EC2
Temos acesso ao arquivo criado na instância 1 que está presente no nosso sistema de arquivos.
![image](https://github.com/user-attachments/assets/73595500-1d89-4865-b42d-1c6bc34066a8)

### Fim
Acesse o DNS do Load Balancer para se conectar ao projeto agora

![image](https://github.com/user-attachments/assets/10f9e13e-ba15-4b65-b783-46f3436bcd19)

````shel
#!/bin/bash

# Atualiza o sistema e instala dependências
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y docker.io
sudo apt-get install -y mysql-client

sudo apt install -y nfs-common

## Montagem para Linux 
sudo apt-get -y install git binutils rustc cargo pkg-config libssl-dev
git clone https://github.com/aws/efs-utils
cd efs-utils
./build-deb.sh
sudo apt-get -y install ./build/amazon-efs-utils*deb

# Cria o diretório efs 
sudo mkdir -p /mnt/efs

sudo mount -t efs -o tls fs-(id):/ efs

# Instalar docker-compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Configura o diretório para o projeto WordPress
PROJECT_DIR=/home/ubuntu/wordpress
sudo mkdir -p $PROJECT_DIR
sudo chown -R $USER:$USER $PROJECT_DIR
cd $PROJECT_DIR

# Cria o arquivo docker-compose.yml
sudo tee docker-compose.yml > /dev/null <<EOL
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    container_name: {name}
    ports:
      - "80:80"
    environment:
      WORDPRESS_DB_HOST: {host}
      WORDPRESS_DB_USER: {user}
      WORDPRESS_DB_PASSWORD: {senha}
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - /mnt/efs:/var/www/html

EOL

# Inicia o Docker Compose
docker-compose up -d

# Aguarda o container WordPress estar ativo
echo "Aguardando o container WordPress iniciar..."
until sudo docker ps | grep -q "Up.*wordpress"; do
  echo "Verificando containers em execução..."
  sudo docker ps
  sleep 5
done
echo "Container WordPress iniciado!"


# Adiciona o arquivo healthcheck.php no container WordPress
echo "Criando o arquivo healthcheck.php no container WordPress..."
sudo docker exec -i wordpress bash -c "cat <<EOF > /var/www/html/healthcheck.php
<?php
http_response_code(200);
header('Content-Type: application/json');
echo json_encode([\"status\" => \"OK\", \"message\" => \"Health check passed\"]);
exit;
?>
EOF"

# Confirma a criação do arquivo
if docker exec -i wordpress ls /var/www/html/healthcheck.php > /dev/null 2>&1; then
  echo "Arquivo healthcheck.php criado com sucesso!"
else
  echo "Falha ao criar o arquivo healthcheck.php."
fi
````