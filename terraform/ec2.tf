resource "aws_instance" "newswirehub-ec2" {
  ami           = "ami-0c1a7f89451184c8b"
  instance_type = "t2.micro"
  key_name = "newswirehub"
  vpc_security_group_ids = ["sg-07d54d82ff526e75a"]
  iam_instance_profile = aws_iam_instance_profile.ec2-profile.name
}

resource "aws_iam_instance_profile" "ec2-profile" {
  name = "ec2-profile"
  role = aws_iam_role.ec2-role.name
}