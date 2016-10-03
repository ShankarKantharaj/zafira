'use strict';

ZafiraApp.controller('DashboardsCtrl', [ '$scope', '$rootScope', '$http', '$location', 'ProjectProvider', '$modal', '$route', function($scope, $rootScope, $http, $location, ProjectProvider, $modal, $route) {
	
	$scope.dashboardId = $location.search().id;
	
	$scope.loadAllDashboards = function() {
		$http.get('dashboards/all').success(function(dashboards) {
			$scope.dashboards = dashboards;
			if($scope.dashboardId == null && $scope.dashboards.length > 0)
			{
				$scope.dashboard = $scope.dashboards[0];
				$scope.dashboard.active = true;
				$scope.loadDashboardData($scope.dashboard);
			}
			else if($scope.dashboardId != null && dashboards.length > 0)
			{
				for(var i = 0; i < $scope.dashboards.length; i++)
				{
					if($scope.dashboards[i].id == $scope.dashboardId)
					{
						$scope.dashboard = $scope.dashboards[i];
						$scope.dashboard.active = true;
						$scope.loadDashboardData($scope.dashboard);
						break;
					}
				}
			}
		});
	};
	
	$scope.switchDashboard = function(id) {
		window.open($location.$$absUrl.split("?")[0] + "?id=" + id, '_self');
	};
	
	$scope.loadDashboardData = function(dashboard) {
		for(var i = 0; i < dashboard.widgets.length; i++)
		{
			$scope.loadWidget(dashboard.widgets[i]);
		}
	};
	
	$scope.loadWidget = function(widgets) {
		var sqlAdapter = {};
		sqlAdapter.sql = widgets.sql;
		$http.post('widgets/sql' + ProjectProvider.getProjectQueryParam(), sqlAdapter).success(function(data) {
			for(var j = 0; j < data.length; j++)
			{
				if(data[j].CREATED_AT)
				{
					data[j].CREATED_AT = new Date(data[j].CREATED_AT);
				}
			}
			widgets.model = JSON.parse(widgets.model);
			widgets.data = {};
			widgets.data.dataset = data;
		});
	};
	
	(function init(){
		$scope.loadAllDashboards();
	})();
	
	
	$scope.openDashboardDetailsModal = function(id, copy){
		if(id)
		{
			$http.get('dashboards/' + id).success(function(dashboard) {
				$modal.open({
					templateUrl : 'resources/templates/dashboard-details-modal.jsp',
					resolve : {
						'dashboard' : function(){
							return dashboard;
						}
					},
					controller : function($scope, $modalInstance, dashboard){
						
						$scope.dashboard = dashboard;
						if(copy)
						{
							$scope.dashboard.id = null;
						}
						
						$scope.createDashboard = function(dashboard){
							$http.post('dashboards', dashboard).success(function(data) {
								window.open($location.$$absUrl.split("?")[0] + "?id=" + data.id, '_self');
							}).error(function(data, status) {
								alert('Failed to create dashboard');
							});
							$modalInstance.close(0);
						};
		
						$scope.updateDashboard = function(dashboard){
							$http.put('dashboards', dashboard).success(function(data) {
								$route.reload();
							}).error(function(data, status) {
								alert('Failed to update dashboard');
							});
							$modalInstance.close(0);
						};
						
						$scope.deleteDashboard = function(dashboard){
							$http.delete('dashboards/' + dashboard.id).success(function() {
								window.open($location.$$absUrl.split("?")[0], '_self');
							}).error(function(data, status) {
								alert('Failed to delete dashboard');
							});
							$modalInstance.close(0);
						};
						
						$scope.cancel = function(){
							$modalInstance.close(0);
						};
					}
				});
			}).error(function() {
				console.error('Failed to load dashboard');
			});
		}
		else
		{
			$modal.open({
				templateUrl : 'resources/templates/dashboard-details-modal.jsp',
				controller : function($scope, $modalInstance){
					
					$scope.dashboard = {};
	
					$scope.createDashboard = function(dashboard){
						$http.post('dashboards', dashboard).success(function(data) {
							$route.reload();
						}).error(function(data, status) {
							alert('Failed to create dashboard');
						});
						$modalInstance.close(0);
					};
					
					$scope.cancel = function(){
						$modalInstance.close(0);
					};
				}
			});
		}
	};
	
	$scope.openWidgetDetailsModal = function(id, copy){
		if(id)
		{
			$http.get('widgets/' + id).success(function(widget) {
				$modal.open({
					templateUrl : 'resources/templates/widget-details-modal.jsp',
					resolve : {
						'dashboard' : function(){
							return widget;
						}
					},
					controller : function($scope, $modalInstance, widget){
						
						$scope.widget = widget;
						if(copy)
						{
							$scope.widget.id = null;
						}
						
						$scope.createWidget = function(widget){
							$http.post('widgets', widget).success(function(data) {
								$route.reload();
							}).error(function(data, status) {
								alert('Failed to create widget');
							});
							$modalInstance.close(0);
						};
		
						$scope.updateWidget = function(widget){
							$http.put('widgets', widget).success(function(data) {
								$route.reload();
							}).error(function(data, status) {
								alert('Failed to update widget');
							});
							$modalInstance.close(0);
						};
						
						$scope.deleteWidget = function(widget){
							$http.delete('widgets/' + widget.id).success(function() {
								$route.reload();
							}).error(function(data, status) {
								alert('Failed to delete widget');
							});
							$modalInstance.close(0);
						};
						
						$scope.cancel = function(){
							$modalInstance.close(0);
						};
					}
				});
			}).error(function() {
				console.error('Failed to load widget');
			});
		}
		else
		{
			$modal.open({
				templateUrl : 'resources/templates/widget-details-modal.jsp',
				controller : function($scope, $modalInstance){
					
					$scope.widget = {};
	
					$scope.createWidget = function(widget){
						$http.post('widgets', widget).success(function(data) {
							$route.reload();
						}).error(function(data, status) {
							alert('Failed to create widget');
						});
						$modalInstance.close(0);
					};
					
					$scope.cancel = function(){
						$modalInstance.close(0);
					};
				}
			});
		}
	};
	
}]);