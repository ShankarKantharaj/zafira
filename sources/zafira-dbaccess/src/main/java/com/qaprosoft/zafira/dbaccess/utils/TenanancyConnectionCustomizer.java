/*******************************************************************************
 * Copyright 2013-2018 QaProSoft (http://www.qaprosoft.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.qaprosoft.zafira.dbaccess.utils;

import java.sql.Connection;

import com.mchange.v2.c3p0.AbstractConnectionCustomizer;

/**
 * TenanancyConnectionCustomizer - initializes DB schema according to tenant.
 * 
 * @author akhursevich
 */
public class TenanancyConnectionCustomizer extends AbstractConnectionCustomizer {

	public void onAcquire(Connection c, String parentDataSourceIdentityToken) throws Exception {
		c.setSchema(parentDataSourceIdentityToken.equals("management") ? "management" : TenancyContext.getTenantName());
	}
}