import { IsArray, IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus, TaskPriority } from '../task.model';

export class BulkUpdateTaskDto {
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  assignedTo?: string;
}
