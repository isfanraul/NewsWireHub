resource "aws_ecs_task_definition" "ecs-task-definition" {
  family = "newswirehub-task"
  requires_compatibilities = ["EC2"]

  container_definitions = jsonencode([
    {
      name      = "newswirehub-container"
      image     = aws_ecr_repository.newswirehub-ecr.repository_url
      memory    = 500
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
    }
  ])
}