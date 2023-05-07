select t.guid as task_guid, t.state as task_state, td.bpmn_identifier as task_id
from task t
join task_definition td on td.id = t.task_definition_id
where process_instance_id=(select max(id) from process_instance);
