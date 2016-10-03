<%@ page 
    language="java"
    contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/fragments/taglibs.jsp" %>

<div class="modal-header">
	<h3>Widget settings <button data-ng-if="widget.id" class="btn btn-xs btn-danger" data-ng-really-message="Do you really want to delete widget" data-ng-really-click="deleteWidget(widget)"> <i class="fa fa-times-circle"></i> delete</button></h3>
</div>
<div class="modal-body">
	<form name="widgetForm">
		<div class="form-group">
			<label>Title</label> 
			<input type="text" class="form-control" data-ng-model="widget.title" required></input>
		</div>
		<div class="form-group">
			<label>Type</label> 
			<select class="form-control" data-ng-model="widget.type" required>
				<option value="linechart">Line chart</option>
				<option value="piechart">Pie chart</option>
				<option value="table">Table</option>
			</select>
		</div>
		<div class="form-group">
			<label>SQL</label> 
			<textarea class="form-control" data-ng-model="widget.sql" rows="15"></textarea>
		</div>
		<div class="form-group">
			<label>Model</label> 
			<textarea class="form-control" data-ng-model="widget.model" rows="15"></textarea>
		</div>
	</form>
</div>
<div class="modal-footer">
	<button data-ng-if="!widget.id" class="btn btn-success" data-ng-click="createWidget(widget)"  data-ng-disabled="widgetForm.$invalid">
    	Create
    </button>
	<button data-ng-if="widget.id" class="btn btn-success" data-ng-click="updateWidget(widget)"  data-ng-disabled="widgetForm.$invalid">
    	Save
    </button>
    <button class="btn btn-primary" data-ng-click="cancel()">
    	Cancel
    </button>
</div>