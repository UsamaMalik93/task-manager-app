import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BulkUpdateTaskDto } from './dto/bulk-update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { JwtAuthGuard } from 'src/auth/decorators/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { BaseController } from 'src/common/controllers/base.controller';
import { AuthenticatedUser } from 'src/common/types/user.types';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController extends BaseController {
  constructor(private readonly taskService: TaskService) {
    super();
  }

  @Get()
  async getTasks(
    @Query() query: TaskQueryDto,
    @User() user: AuthenticatedUser,
  ) {
    const { userId, userRoles, organizationId } = this.extractUserContext(user);
    
    return this.taskService.getTasksWithRBAC(organizationId, query, userId, userRoles);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: AuthenticatedUser,
  ) {
    const { userId, organizationId } = this.extractUserContext(user);
    return this.taskService.createTask(createTaskDto, organizationId, userId);
  }

  @Patch('bulk')
  async bulkUpdateTasks(
    @Body() bulkUpdateDto: BulkUpdateTaskDto,
    @User() user: AuthenticatedUser,
  ) {
    const { userId, userRoles, organizationId } = this.extractUserContext(user);
    return this.taskService.bulkUpdateTasksWithRBAC(bulkUpdateDto, userId, userRoles, organizationId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user: AuthenticatedUser,
  ) {
    const { userId, userRoles, organizationId } = this.extractUserContext(user);
    
    return this.taskService.updateTaskWithRBAC(id, updateTaskDto, userId, userRoles, organizationId);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', MongoIdPipe) id: string,
    @User() user: AuthenticatedUser,
  ) {
    const { userId, userRoles, organizationId } = this.extractUserContext(user);
    
    return this.taskService.deleteTaskWithRBAC(id, userId, userRoles, organizationId);
  }
}
