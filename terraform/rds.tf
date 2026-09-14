resource "aws_db_instance" "newswirehub-db" {
  allocated_storage    = 20
  engine               = "mysql"
  db_name              = "news"
  engine_version       = "8.4.3"
  instance_class       = "db.t3.micro"
  identifier           = "newswirehub-db"
  username             = "admin"
  password             = "admin123"
  vpc_security_group_ids = ["sg-08d52b1c6a80f065f"]
  publicly_accessible   = true
  skip_final_snapshot  = true
}