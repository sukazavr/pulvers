import { strict, task, option } from 'foy'
import { taskBuildClient } from './config/task.build.client'
import { taskBuildServer } from './config/task.build.server'
import { taskDev } from './config/task.dev'
import { taskRelease } from './config/task.release'

strict()

task('dev', taskDev)
task('build:client', taskBuildClient)
task('build:server', taskBuildServer)

option('-i', 'increment version')
task('release', taskRelease)
